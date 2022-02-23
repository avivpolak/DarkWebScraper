"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const typeGourds_1 = require("../../../types/typeGourds");
const configReader_1 = require("../../shared/configReader");
const isURL_1 = __importDefault(require("validator/lib/isURL"));
const fetchData = async (url, useTor) => {
    try {
        let response;
        const generalConfig = await (0, configReader_1.readConfig)("../../../configs/general.yaml");
        if ((0, typeGourds_1.isGeneralConfig)(generalConfig) && (0, isURL_1.default)(url)) {
            if (useTor) {
                const response = await axios_1.default.get(url, {
                    proxy: generalConfig.proxy,
                });
                return response.data;
            }
            else {
                response = await axios_1.default.get(url);
                return response.data;
            }
        }
        const Erorr_Server_Fetch_NoData = {
            message: "no data found",
            code: "SERVER_ERROR",
            subCode: "fetch error",
        };
        throw Erorr_Server_Fetch_NoData;
    }
    catch (error) {
        const Erorr_Server_Fetch = {
            message: error.message,
            code: "SERVER_ERROR",
            subCode: "fetch error",
        };
        throw Erorr_Server_Fetch;
    }
};
exports.fetchData = fetchData;
//# sourceMappingURL=fetcher.js.map