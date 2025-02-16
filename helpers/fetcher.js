const fetch = require("node-fetch");

exports.fetcher = (body, url, method,header = {}) => {
    return new Promise((resolve, reject) => {

        fetch(url, {
            method,
            credentials: "include",
            mode: "cors",
            headers: {
                "content-type": "application/json",
                ...header
            },
            body: JSON.stringify(body)
        })
        .then(res => resolve(res.json()))
        .catch(err => reject(err))
        
    })
}