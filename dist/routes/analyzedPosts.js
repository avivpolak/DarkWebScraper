"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//scraper router
const express_1 = __importDefault(require("express"));
const analyzedPosts_1 = require("../controllers/analyzedPosts");
const analyzedPostsRouter = express_1.default.Router();
analyzedPostsRouter.get('/', analyzedPosts_1.getAnalyzedPosts);
exports.default = analyzedPostsRouter;
