"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const typeGourds_1 = require("../../../types/typeGourds");
const configReader_1 = require("../../shared/configReader");
const fetchData = async (url, useTor) => {
    try {
        let response = {};
        const generalConfig = await (0, configReader_1.readConfig)("../../../configs/general.yaml");
        if ((0, typeGourds_1.isGeneralConfig)(generalConfig)) {
            if (useTor) {
                response = await axios_1.default.get(url, { proxy: generalConfig.proxy });
                return response.data;
            }
            else {
                response = await axios_1.default.get(url, { headers: { host: "atlas.microsoft.com" } });
                return response.data;
            }
        }
        return undefined;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.fetchData = fetchData;
//# sourceMappingURL=fetcher.js.map