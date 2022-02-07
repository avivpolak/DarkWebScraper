//scraper router
import express from'express';
import {getAnalyzedPosts} from '../controllers/analyzedPosts';
const  analyzedPostsRouter = express.Router();

analyzedPostsRouter.get('/', getAnalyzedPosts)

export default analyzedPostsRouter;