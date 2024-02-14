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
    // const payload = { id: savedUser._id, isAdmin: savedUser.isAdmin };
    // const token = jwt.sign(payload, process.env.JWT, {
    //     expiresIn: "7days"
    // });

    const { password: pass, ...others } = savedUser._doc;
    res.status(200).json(others);
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
    let isVarified = true;
    const updateUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { isVarified } },
      { new: true }
    );

    // const validated = await bcrypt.compare(password, user.password);
    // if (!validated) {
    //   return next(createError(400, "Wrong credentials"));
    // }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      {
        expiresIn: "7days",
      }
    );

    const { password: pass, ...others } = updateUser._doc;

    res.status(200).json({ user: others, token });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  const id = req.params.id;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    await User.findByIdAndUpdate(id, { $set: { password: hashedPass } });
    return res.status(200).json({ message: "password updated successFully!" });
  } catch (error) {
    next(error);
  }
};

exports.googleProvider = async (req, res, next) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User(req.body);
      try {
        const savedUser = await newUser.save();
        const payload = { id: savedUser._id, isAdmin: savedUser.isAdmin };
        const token = jwt.sign(payload, process.env.JWT, {
          expiresIn: "7days",
        });

        const { password: pass, ...others } = savedUser._doc;
        res.status(200).json({ user: others, token });
      } catch (err) {
        next(err);
      }
    }

    if (user && user.isVarified === false) {
      // const newUser = new User(req.body);
      try {
        const savedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: req.body },
          { new: true }
        );
        const payload = { id: savedUser._id, isAdmin: savedUser.isAdmin };
        const token = jwt.sign(payload, process.env.JWT, {
          expiresIn: "7days",
        });

        const { password: pass, ...others } = savedUser._doc;
        res.status(200).json({ user: others, token });
      } catch (err) {
        next(err);
      }
    }
    if (user && user.isVarified === true) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT,
        {
          expiresIn: "7days",
        }
      );

      // console.log("token", token);

      const { password: pass, ...others } = user._doc;
      res.status(200).json({ user: others, token });
    }
  } catch (err) {
    next(err);
  }
};
