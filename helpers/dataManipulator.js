exports.getDataFromObject = (mainObj, arrayOfPreferedObj) => {
    let returnObj = {};

    arrayOfPreferedObj.forEach(ar => {
        mainObj[ar] && (returnObj[ar] = mainObj[ar])
    });

    return returnObj
}


//STRIP TEXT FROM HTML
exports.stripTextFromHtml = (text) => {
    const { stripHtml } = require("string-strip-html");
    return stripHtml(text).result
}