const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middleware/errorMiddleware");
const logger = require("./helpers/logger");
const authRoute = require('./routes/auth/auth');
const generalRoute = require('./routes/general/general');
const userRoute = require('./routes/user/user');
const notFoundRoute = require('./routes/error/notfound');
const adminRoute = require('./routes/admin/admin');

// Load Environment Variables
require("dotenv").config();

// Initialize Express App
const app = express();

// Database Connection
try {
    require('./models/db');
} catch (dbError) {
    console.error("Database connection failed:", dbError);
}

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(hpp());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Jobs
require("./jobs/mineEngine");
require("./jobs/job");

// Routes
app.use("/", authRoute);
app.use("/", generalRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("*", notFoundRoute);

// Error Middleware
app.use(errorMiddleWare);


// Error Handling
process.on('uncaughtException', (err) => {
    console.error("Uncaught Exception:", err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});