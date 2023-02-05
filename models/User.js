const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email address is required"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
        },
        password: {
            type: String,
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password {VALUE} is not strong enough.",
            },
        },
        contactNumber: {
            type: String,
            validate: [
                validator.isMobilePhone,
                "Please provide a valid contact number",
            ],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

        district: String,
        upazila: String,
        address: String,

        isAdmin: {
            type: Boolean,
            default: false,
        },
        // confirmationToken: String,
        // confirmationTokenExpires: Date,

        // passwordChangedAt: Date,
        // passwordResetToken: String,
        // passwordResetExpires: Date,
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
