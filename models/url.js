const mongoose = require('mongoose');
const { isURL } = require('validator');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return isURL(v, { require_protocol: true });
            },
            message: 'Not a valid URL. Please include http:// or https://'
        }
    },
    cntClicks: [{timestamp: Number}],
},
{
    timestamps: true
});

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;