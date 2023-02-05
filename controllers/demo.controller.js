const Demo = require("../models/Demo");

//create information
exports.saveDemo = async (req, res, next) => {
    const newDemo = new Demo(req.body);
    try {
        const savedDemo = await newDemo.save();
        res.status(200).json(savedDemo);
    } catch (error) {
        next(error);
    }
};

//update information
exports.updateDemo = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedDemo = await Demo.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedDemo);
    } catch (error) {
        next(error);
    }
};

//delete information
exports.deleteDemo = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Demo.findByIdAndDelete({ _id: id });
        res.status(200).json({ msg: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

//get all information
exports.getAllDemo = async (req, res, next) => {
    try {
        const demos = await Demo.find();
        res.status(200).json(demos);
    } catch (error) {
        next(error);
    }
};

//get a user information
exports.getADemo = async (req, res, next) => {
    const id = req.params.id;
    try {
        const demo = await Demo.findById(id);
        res.status(200).json(demo);
    } catch (error) {
        next(error);
    }
};
//=========================================================== //
//============= ADVANCED QUERY START========================//
//=========================================================== //
exports.getProducts = async (req, res, next) => {
    try {
        //{price:{$ gt:50}
        //{ price: { gt: '50' } }
        console.log(req.query);

        let filters = { ...req.query };

        //sort , page , limit -> exclude
        const excludeFields = ["sort", "page", "limit"];
        excludeFields.forEach((field) => delete filters[field]);

        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        filters = JSON.parse(filtersString);

        const queries = {};

        if (req.query.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
            console.log(fields);
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query; // "3" "10"
            //50 products
            // each page 10 product
            //page 1--> 1-10
            //page 2--> 2-20
            //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
            //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
            //page 5--> 41-50

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const products = await getProductsService(filters, queries);

        res.status(200).json({
            status: "success",
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        });
    }
};
//=========================================================== //
//============= ADVANCED QUERY END========================//
//=========================================================== //
//=============FILE UPLOAD START=========================//
exports.fileUpload = async (req, res) => {
    try {
        res.status(200).json(req.file);
    } catch (error) {}
};
//=============FILE UPLOAD END=========================//
