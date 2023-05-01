const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser')

const app = express();

dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// import all route here (Second one is demo route)
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");
const publisherRoute = require("./routes/publisher.route");
const authorRoute = require("./routes/author.route");
const reviewRoute = require("./routes/review.route");
const wishlistRoute = require("./routes/wishlist.route");
const bookRoute = require("./routes/book.route");
const orderRoute = require("./routes/order.route");
const paymentRoute = require("./routes/payment.route");

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("DB Disconnected");
});

app.get("/", (req, res) => {
    res.send("Welcome to server");
});

app.use("/api/v1/boikini/auth", authRoute);
app.use("/api/v1/boikini/user", userRoute);
app.use("/api/v1/boikini/category", categoryRoute);
app.use("/api/v1/boikini/sub-category", subCategoryRoute);
app.use("/api/v1/boikini/publisher", publisherRoute);
app.use("/api/v1/boikini/author", authorRoute);
app.use("/api/v1/boikini/review", reviewRoute);
app.use("/api/v1/boikini/wishlist", wishlistRoute);
app.use("/api/v1/boikini/book", bookRoute);
app.use("/api/v1/boikini/order", orderRoute);
app.use("/api/v1/boikini/payment", paymentRoute);

//Global Error Handlaer
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(port, () => {
    connect();
    console.log("Server is running", port);
});
