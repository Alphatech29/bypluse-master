const mysql = require("mysql");
const logger = require("../helpers/logger");

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3307,
    database: 'bypluse',
    charset: "utf8mb4",
    connectTimeout: 20000
});

db.getConnection((err, connection) => {
    if (err) {
        logger.debug("❌ Database Connection Error:", err);
        console.log("❌ Database Connection Error:", err);
        return;
    }

    console.log("✅ Database Connected Successfully!");
    logger.debug("✅ Database Connected Successfully!");
    
    // Release the connection when done
    connection.release();
});

module.exports = db;
