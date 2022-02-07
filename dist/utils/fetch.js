"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
//getting the data from the url
const fetchData = async (url, proxy) => {
    try {
        const response = await axios_1.default.get(url, {
            proxy,
        });
        return response.data;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.fetchData = fetchData;
