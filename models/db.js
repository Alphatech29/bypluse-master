const mysql = require("mysql");
const logger = require("../helpers/logger");

const env = process.env.NODE_ENV || "development"; 

const dbConfig = {
    production: {
        host: "panel909.harmondns.net",
        user: "byplusec_bypluse",
        password: "%jAJ!ns5jS1V",
        database: "byplusec_bypluse"
    },
    development: {
        host: "localhost",
        user: "root",
        password: "",
        port:3307,
        database: "bypluse"
    }
};

const db = mysql.createPool({
    connectionLimit: 10,
    ...dbConfig[env], 
    charset: "utf8mb4",
    connectTimeout: 40000
});

db.getConnection((err, connection) => {
    if (err) {
        logger.debug("❌ Database Connection Error:", err);
        console.log("❌ Database Connection Error:", err.code, err.sqlMessage);
        return;
    }

    console.log(`✅ Database Connected Successfully! ${env.toUpperCase()}`);
    logger.debug(`✅ Database Connected Successfully! ${env.toUpperCase()}`);

    connection.release();
});

module.exports = db;
