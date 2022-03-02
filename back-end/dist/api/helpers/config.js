"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStandartConfigToReqConfig = exports.convertToStandartConfig = exports.getAllConfigs = void 0;
const configReader_1 = require("../../webScraper/shared/configReader");
const typeGourds_1 = require("../../types/typeGourds");
const fs = require("fs");
const path = require("path");
const getAllConfigs = async () => {
    //get all configs from fs
    const configs = fs.readdirSync(path.join(__dirname, "../../../configs/sites"));
    const allConfigs = [];
    for (const config of configs) {
        const configObj = await (0, configReader_1.readConfig)(`../../../configs/sites/${config}`);
        if (configObj && (0, typeGourds_1.isConfig)(configObj)) {
            allConfigs.push(configObj);
        }
    }
    return allConfigs;
};
exports.getAllConfigs = getAllConfigs;
const convertToStandartConfig = (reqConfig) => {
    try {
        const config = {
            name: reqConfig.name,
            url: reqConfig.url,
            useTor: Boolean(reqConfig.useTor),
            maxUrls: Number(reqConfig.maxUrls),
            allPosts: {
                selector: reqConfig.allPostsSelector,
            },
            params: {
                [reqConfig.param1Name]: {
                    selector: reqConfig.param1Selector,
                    regex: new RegExp(reqConfig.param1REGEX),
                },
                [reqConfig.param2Name]: {
                    selector: reqConfig.param2Selector,
                    regex: new RegExp(reqConfig.param2REGEX),
                },
                [reqConfig.param3Name]: {
                    selector: reqConfig.param3Selector,
                    regex: new RegExp(reqConfig.param3REGEX),
                },
                [reqConfig.param4Name]: {
                    selector: reqConfig.param4Selector,
                    regex: new RegExp(reqConfig.param4REGEX),
                },
            },
        };
        if (Boolean(reqConfig.save)) {
            (0, configReader_1.writeConfig)(config, "../../../configs/sites");
        }
        return config;
    }
    catch (error) {
        const err = {
            message: "config convert error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.convertToStandartConfig = convertToStandartConfig;
const convertStandartConfigToReqConfig = (config) => {
    try {
        const reqConfig = {
            name: config.name,
            url: config.url,
            useTor: Boolean(config.useTor),
            maxUrls: String(config.maxUrls),
            allPostsSelector: config.allPosts.selector,
            param1Name: Object.keys(config.params)[0],
            param1Selector: config.params[Object.keys(config.params)[0]].selector,
            param1REGEX: config.params[Object.keys(config.params)[0]].regex.source,
            param2Name: Object.keys(config.params)[1],
            param2Selector: config.params[Object.keys(config.params)[1]].selector,
            param2REGEX: config.params[Object.keys(config.params)[1]].regex.source,
            param3Name: Object.keys(config.params)[2],
            param3Selector: config.params[Object.keys(config.params)[2]].selector,
            param3REGEX: config.params[Object.keys(config.params)[2]].regex.source,
            param4Name: Object.keys(config.params)[3],
            param4Selector: config.params[Object.keys(config.params)[3]].selector,
            param4REGEX: config.params[Object.keys(config.params)[3]].regex.source,
            save: true,
        };
        return reqConfig;
    }
    catch (error) {
        console.log(error);
        const err = {
            message: "config convert error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.convertStandartConfigToReqConfig = convertStandartConfigToReqConfig;
//# sourceMappingURL=config.js.map