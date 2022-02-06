//scraper router
const express = require('express');
const scraperRouter = express.Router();
const scraper = require('../controllers/scraper');


scraperRouter.get('/', scraper)

module.exports = scraperRouter;