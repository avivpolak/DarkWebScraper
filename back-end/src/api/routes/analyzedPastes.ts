//scraper router
import express from'express';
import { getPasteByIdFromDb } from '../../prisma/utils/paste/actions';
import {getPagesPastes,getPastesByQuery,deleteAllPastes,getLabelsStatistics, getCount, getPasteById} from '../controllers/analyzedPastes';
import { getConfigs, getCustumScrape } from '../controllers/customScrape';
const  analyzedPastesRouter = express.Router();

analyzedPastesRouter.get('/stats', getLabelsStatistics)
analyzedPastesRouter.get('/delete', deleteAllPastes)
analyzedPastesRouter.get('/countAll', getCount)
analyzedPastesRouter.get('/paste', getPasteById)
analyzedPastesRouter.get('/configs', getConfigs)
analyzedPastesRouter.get('/', getPagesPastes)
analyzedPastesRouter.get('/:query', getPastesByQuery)
analyzedPastesRouter.post('/custom', getCustumScrape)
analyzedPastesRouter.get('/configs', getCustumScrape)

export default analyzedPastesRouter;