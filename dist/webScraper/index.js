"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stronghold_1 = __importDefault(require("../configs/sites/Stronghold"));
const scraper_1 = __importDefault(require("./scraper/scraper"));
// import { readConfig } from "./shared/configReader";
// console.log(readConfig("../../config.yaml"),config)
// readConfig("../../config.yaml")
// setInterval(() => {
(0, scraper_1.default)(Stronghold_1.default);
// }, 120000);
// import {getLabels} from "../analyzer/labels";
// getLabels()
//# sourceMappingURL=index.js.map