"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
const general_1 = __importDefault(require("../../../configs/general"));
const fetchData = async (url, useTor) => {
    try {
        let response = {};
        if (useTor) {
            response = await axios_1.default.get(url, { proxy: general_1.default.proxy });
            return response.data;
        }
        else {
            response = await axios_1.default.get(url);
            return response.data;
        }
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.fetchData = fetchData;
//# sourceMappingURL=fetcher.js.map