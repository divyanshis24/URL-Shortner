const express = require('express');
const router = express.Router();
const { getShortURL } = require('../controllers/url');
const {getAnalytics} = require('../controllers/url');

router.post('/shorten', getShortURL);
router.get('/analytics/:shortID', getAnalytics);

module.exports = router;