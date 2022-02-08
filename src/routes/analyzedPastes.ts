//scraper router
import express from'express';
import {getAllPastes,getPastesByQuery} from '../controllers/analyzedPastes';
const  analyzedPastesRouter = express.Router();

analyzedPastesRouter.get('/:query', getPastesByQuery)
analyzedPastesRouter.get('/', getAllPastes)

export default analyzedPastesRouter;