"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//scraper router
const express_1 = __importDefault(require("express"));
const analyzedPastes_1 = require("../controllers/analyzedPastes");
const customScrape_1 = require("../controllers/customScrape");
const analyzedPastesRouter = express_1.default.Router();
analyzedPastesRouter.get('/stats', analyzedPastes_1.getLabelsStatistics);
analyzedPastesRouter.get('/delete', analyzedPastes_1.deleteAllPastes);
analyzedPastesRouter.get('/countAll', analyzedPastes_1.getCount);
analyzedPastesRouter.get('/', analyzedPastes_1.getPagesPastes);
analyzedPastesRouter.get('/:query', analyzedPastes_1.getPastesByQuery);
analyzedPastesRouter.post('/custom', customScrape_1.getCustumScrape);
exports.default = analyzedPastesRouter;
//# sourceMappingURL=analyzedPastes.js.map