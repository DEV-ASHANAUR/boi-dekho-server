const Order = require("../models/Order");

//create information
exports.saveOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        next(error);
    }
};

//update information
// exports.updateOrder = async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         const updatedOrder = await Order.findByIdAndUpdate(
//             id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         next(error);
//     }
// };

//delete information
// exports.deleteOrder = async (req, res, next) => {
//     const id = req.params.id;
//     try {
//         await Order.findByIdAndDelete({ _id: id });
//         res.status(200).json({ msg: "Deleted Successfully" });
//     } catch (error) {
//         next(error);
//     }
// };

//get information by user
exports.getAUserOrder = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const order = await Order.find({ userId });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.find();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// GET MONTHLY INCOME
exports.getIncome = async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        next(error);
    }
};
