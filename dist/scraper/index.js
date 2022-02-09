"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./utils/scraper");
const mockConfig_1 = __importDefault(require("../mockConfig"));

(0, scraper_1.scrape)(mockConfig_1.default);
