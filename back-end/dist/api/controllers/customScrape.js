"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustumScrape = void 0;
const scraper_1 = require("../../webScraper/scraper/scraper");
const utils_1 = require("../helpers/utils");
const getCustumScrape = async (req, res) => {
    try {
        const config = (0, utils_1.convertToStandartConfig)(req.body);
        const allPastes = await (0, scraper_1.custumScrape)(config);
        if (allPastes && allPastes.length > 0) {
            return res.status(200).json({ data: allPastes });
        }
        else {
            console.log(allPastes);
            return res.status(404).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getCustumScrape = getCustumScrape;
//# sourceMappingURL=customScrape.js.map