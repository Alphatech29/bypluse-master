const mysql = require("mysql");
const logger = require("../helpers/logger");

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'panel909.harmondns.net',
    user: 'byplusec_bypluse',
    password: '%jAJ!ns5jS1V',
    database: 'byplusec_bypluse',
    charset: "utf8mb4",
    connectTimeout: 40000
});

db.getConnection((err, connection) => {
    if (err) {
        logger.debug("❌ Database Connection Error:", err);
        console.log("❌ Database Connection Error:", err.code, err.sqlMessage);
        return;
    }

    console.log("✅ Database Connected Successfully!");
    logger.debug("✅ Database Connected Successfully!");

    connection.release();
});

module.exports = db;
