const URL = require('../models/url');
const shortid = require("shortid");

async function getShortURL(req, res) {
    const body = req.body;
    if(!body.redirectURL) {
        return res.status(400).json({message: 'redirectURL is required'});
    }
    const shortID = shortid();
    await URL.create
    ({
        shortID : shortID,
        redirectURL : body.redirectURL,
        cntClicks : [],
    });
    return res.status(201).json({id : shortID});
}

async function getAnalytics(req, res) {
    const shortID = req.params.shortID;
    await URL.findOne({shortID});
    return res.json({ totalClicks : XPathResult.cntClicks.length})
}

module.exports = {
    getShortURL,
    getAnalytics
};