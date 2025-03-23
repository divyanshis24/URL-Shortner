const axios = require("axios");
const URL = require('../models/url');
const shortid = require("shortid");

async function isURLExpired(redirectURL) {
    try {
        const response = await axios.get(redirectURL, { 
            timeout: 20000,
        });
        console.log(`Response status: ${response.status}`);
        return response.status >= 400;
    } catch (error) {
        return false;
    }
}

async function getShortURL(req, res) {
    const body = req.body;
    if(!body.redirectURL) {
        return res.status(400).json({message: 'redirectURL is required'});
    }

    if (await isURLExpired(body.redirectURL)) {
        return res.status(400).json({ message: "The provided redirect URL is expired or inaccessible." });
    }
    
    const existingURL = await URL.findOne({ redirectURL: body.redirectURL });
    if (existingURL) {
        return res.status(200).json({ id: existingURL.shortID });
    }

    const customAlias = req.query.alias;
    let shortID;
    
    if (customAlias) {

        //if the alias is already taken
        const existingURL = await URL.findOne({ shortID: customAlias });
        if (existingURL) {
            const randomSuffix = shortid().substring(0, 4);
            shortID = `${customAlias}-${randomSuffix}`;
        }
        else
        shortID = customAlias;

    } else {
        
        console.log("No alias provided")
        shortID = shortid();
    }
    
    await URL.create({
        shortID: shortID,
        redirectURL: body.redirectURL,
        cntClicks: [],
    });
    
    return res.status(201).json({ id: shortID });
}

async function getAnalytics(req, res) {

    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({ totalClicks : result.cntClicks.length})

}

module.exports = {
    getShortURL,
    getAnalytics
};