//scraper router
import express from'express';
import {getPagesPastes,getPastesByQuery,deleteAllPastes,getLabelsStatistics, getCount} from '../controllers/analyzedPastes';
import { getCustumScrape } from '../controllers/customScrape';
const  analyzedPastesRouter = express.Router();

analyzedPastesRouter.get('/stats', getLabelsStatistics)
analyzedPastesRouter.get('/delete', deleteAllPastes)
analyzedPastesRouter.get('/countAll', getCount)
analyzedPastesRouter.get('/', getPagesPastes)
analyzedPastesRouter.get('/:query', getPastesByQuery)
analyzedPastesRouter.post('/custom', getCustumScrape)

export default analyzedPastesRouter;