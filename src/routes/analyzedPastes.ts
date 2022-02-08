//scraper router
import express from'express';
import {getAllPastes,getPastesByQuery,deleteAllPastes} from '../controllers/analyzedPastes';
const  analyzedPastesRouter = express.Router();

analyzedPastesRouter.get('/delete', deleteAllPastes)
analyzedPastesRouter.get('/:query', getPastesByQuery)
analyzedPastesRouter.get('/', getAllPastes)

export default analyzedPastesRouter;