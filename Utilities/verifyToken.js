const jwt = require("jsonwebtoken");
const { createError } = require("./error");

//Token verify
exports.verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// User verify
exports.verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        console.log("verified");
        next();
    } else {
        console.log("decline");
        return next(createError(403, "You are not authorized!"));
    }
};

// Admin verify
exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
};
