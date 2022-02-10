"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//scraper router
const express_1 = __importDefault(require("express"));
const analyzedPastes_1 = require("../controllers/analyzedPastes");
const analyzedPastesRouter = express_1.default.Router();
analyzedPastesRouter.get('/delete', analyzedPastes_1.deleteAllPastes);
analyzedPastesRouter.get('/:query', analyzedPastes_1.getPastesByQuery);
analyzedPastesRouter.get('/', analyzedPastes_1.getAllPastes);
exports.default = analyzedPastesRouter;
//# sourceMappingURL=analyzedPastes.js.map