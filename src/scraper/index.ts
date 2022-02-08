import { Config } from "../types/config";
import { scraper } from "./utils/scraper";
import config from "../mockConfig";
import { PrismaClient } from "@prisma/client";
import { saveToDb } from "../prisma/actions";

const prisma = new PrismaClient();

const scrape = async (config: Config) => {
    try {
        console.log("starting scraper");
        const data = await scraper(config);
        console.log("saving data to db...");
        if (data) {
            for (let post of data) {
              await saveToDb(post)
                    .catch((e) => {
                        throw e;
                    })
                    .finally(async () => {
                        await prisma.$disconnect();
                    });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

// setInterval(() => {
    scrape(config);
// }, 12000);
