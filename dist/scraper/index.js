"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./utils/scraper");
const mockConfig_1 = __importDefault(require("../mockConfig"));
const client_1 = require("@prisma/client");
const actions_1 = require("../prisma/actions");
const analyzer_1 = require("../analyzer/analyzer");
const prisma = new client_1.PrismaClient();
const scrape = async (config) => {
    try {
        console.log("starting scraper");
        const data = await (0, scraper_1.scraper)(config);
        console.log("saving data to db...");
        if (data) {
            for (let post of data) {
                if (typeof post.content === "string") {
                    post.santimate = (0, analyzer_1.sentimentor)(post.content);
                }
                await (0, actions_1.saveToDb)(post)
                    .catch((e) => {
                    throw e;
                })
                    .finally(async () => {
                    await prisma.$disconnect();
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
// setInterval(() => {
scrape(mockConfig_1.default);
// }, 12000);
