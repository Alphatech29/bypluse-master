const logger = require("../helpers/logger");

const errorMiddleWare = (err, req, res, next) => {
    // Ensure process.env.NODE_ENV is defined before calling .trim()
    const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "production";

    if (env === "dev") {
        console.error("🔥 Error Caught in Middleware:", err); // Log full error
    }

    logger.debug({
        status: err.statusCode || 500,
        message: err.message || "Server Error",
        stack: err.stack, // Log the stack trace for debugging
    });

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Something Went Wrong"
    });
};

module.exports = errorMiddleWare;
