//scraper router
import express from'express';
import {getAllPastes,getPastesByQuery,deleteAllPastes,getLabelsStatistics} from '../controllers/analyzedPastes';
import { getCustumScrape } from '../controllers/customScrape';
const  analyzedPastesRouter = express.Router();

analyzedPastesRouter.get('/stats', getLabelsStatistics)
analyzedPastesRouter.get('/delete', deleteAllPastes)
analyzedPastesRouter.get('/:query', getPastesByQuery)
analyzedPastesRouter.get('/', getAllPastes)
analyzedPastesRouter.post('/custom', getCustumScrape)

export default analyzedPastesRouter;