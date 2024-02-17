const Book = require("../models/Book");
const Order = require("../models/Order");

//create information
exports.saveOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  console.log("new order:", newOrder);

  try {
    const savedOrder = await newOrder.save();

    // Update book quantity
    await Promise.all(
      savedOrder.orderDetails.map(async (item) => {
        const bookId = item._id;
        const updatedQuantity = item.cartQuantity;

        await Book.findByIdAndUpdate(bookId, {
          $inc: { quantity: -updatedQuantity },
        });
      })
    );

    res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

//update information
exports.updateOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.getOrderById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findById({ _id: id });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

//get information by user
exports.getAUserOrder = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const order = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

//get all information
exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getIncome = async (req, res, next) => {
  const date = new Date();
  const currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastMonthEnd = new Date(currentMonthStart);
  lastMonthEnd.setDate(currentMonthStart.getDate() - 1); // Go back one day to get the end of the previous month
  const lastMonthStart = new Date(lastMonthEnd.getFullYear(), lastMonthEnd.getMonth(), 1);

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: currentMonthStart,
            $lt: new Date(),
          },
        },
      },
      {
        $project: {
          createdAt: 1,
          month: { $month: "$createdAt" },
          sales: { $toDouble: "$total" }, // Convert "total" to a double (numeric type)
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    // console.log("Income data for the present month:", income);

    // Extract sales for the present month
    const presentMonthSale = income.find((entry) => entry._id === currentMonthStart.getMonth() + 1)?.total || 0;

    // Extract sales for the previous month
    const previousMonthSale = income.find((entry) => entry._id === lastMonthStart.getMonth() + 1)?.total || 0;

    res.status(200).json({ presentMonthSale, previousMonthSale });
  } catch (error) {
    console.error("Error in getIncome:", error);
    next(error);
  }
};


//deleteAllOrder

exports.monthlySalesReport = async (req, res, next) => {
  try {
    const monthlySalesReport = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $exists: true, // Ensure createdAt field exists
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: { $toDouble: "$total" } }, // Convert total to double for summing
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json(monthlySalesReport);
  } catch (error) {
    console.error("Error in getMonthlySalesReport:", error);
    next(error);
  }
};

exports.deleteAllOrder = async (req, res, next) => {
  try {
    await Order.deleteMany({});
    res.status(200).json("successfully deleted all order");
  } catch (error) {
    next(error);
  }
};
//deleteAllOrder
exports.deleteOrder = async (req, res, next) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
