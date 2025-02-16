const { deleteUnverfiedUser } = require("../helpers/user");
const CronJob = require('cron').CronJob;

//This Job Running Every Week
new CronJob('0 0 * * 0', async function () {

    await deleteUnverfiedUser()

}, null, true, "Africa/Lagos");

