const { notfoundAll } = require("../../controllers/error/notFound");
const { generalData } = require("../../middleware/generalData");

const notFoundRoute = require("express").Router();

//404 Not FOund
notFoundRoute.route("*").all(generalData, notfoundAll)


module.exports = notFoundRoute