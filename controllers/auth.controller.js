const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createError } = require("../Utilities/error");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(404, "user not found"));
        }
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) {
            return next(createError(400, "Wrong Password"));
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT,
            {
                expiresIn: "7days",
            }
        );

        const { password: pass, isAdmin, ...others } = user._doc;
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // })
        //     .status(200)
        //     .json({...others, token});
        res.status(200).json({ ...others, token });
    } catch (err) {
        next(err);
    }
};
