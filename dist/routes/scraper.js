"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//scraper router
const express_1 = __importDefault(require("express"));
const scraper_1 = __importDefault(require("../controllers/scraper"));
const scraperRouter = express_1.default.Router();
scraperRouter.get('/', scraper_1.default);
exports.default = scraperRouter;
