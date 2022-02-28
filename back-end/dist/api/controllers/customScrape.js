"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustumScrape = void 0;
const scraper_1 = require("../../webScraper/scraper/scraper");
const utils_1 = require("../helpers/utils");
const getCustumScrape = async (req, res) => {
    try {
        const rowConfig = {};
        for (let [key, value] of Object.entries(req.body)) {
            if (!key.includes("REGEX")) {
                rowConfig[req.sanitize(key)] = req.sanitize(value);
            }
            else {
                rowConfig[req.sanitize(key)] = value;
            }
        }
        const config = (0, utils_1.convertToStandartConfig)(rowConfig);
        const allPastes = await (0, scraper_1.custumScrape)(config);
        console.log(allPastes);
        if (allPastes && allPastes.length > 0) {
            return res.status(200).json({ data: allPastes });
        }
        else {
            return res.status(204).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getCustumScrape = getCustumScrape;
//# sourceMappingURL=customScrape.js.map