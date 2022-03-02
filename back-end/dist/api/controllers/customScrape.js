"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigs = exports.getCustumScrape = void 0;
const scraper_1 = require("../../webScraper/scraper/scraper");
const config_1 = require("../helpers/config");
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
        const config = (0, config_1.convertToStandartConfig)(rowConfig);
        const allPastes = await (0, scraper_1.custumScrape)(config);
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
const getConfigs = async (req, res) => {
    try {
        const configs = await (0, config_1.getAllConfigs)();
        if (configs) {
            const reqConfigs = [];
            for (let config of configs) {
                reqConfigs.push((0, config_1.convertStandartConfigToReqConfig)(config));
            }
            if (reqConfigs.length > 0) {
                return res.status(200).json(reqConfigs);
            }
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
exports.getConfigs = getConfigs;
//# sourceMappingURL=customScrape.js.map