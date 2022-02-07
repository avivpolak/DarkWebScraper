//scraper router
import express from'express';
import scraper from '../controllers/scraper';
const  scraperRouter = express.Router();

scraperRouter.get('/', scraper)

export default scraperRouter;