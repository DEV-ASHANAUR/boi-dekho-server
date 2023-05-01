const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        orderDetails: {
            type: Array,
        },
        totalCartQty: {
            type: Number,
            min: [0, "quantity can't be negative"],
        },
        subtotal: String,
        shippingFee: String,
        discount: String,
        total: String,
        status: String,
        shippingAddress: {
            fullName: String,
            email: String,
            contactNumber: String,
            zipCode: String,
            division: String,
            district: String,
            upazila: String,
            peakpoint: String,
        },
        payment:{
            type:Boolean,
            default:false
        },
        valId:String,
        tranId:String,
        paymentMethod: String,
        confirmedDate: Date,
        processingDate: Date,
        pickedDate:Date,
        shippedDate: Date,
        deliveredDate: Date,
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
