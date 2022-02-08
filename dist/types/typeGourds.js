"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfig = exports.isString = void 0;
const isString = (str) => {
    return (typeof str === "string");
};
exports.isString = isString;
const isConfig = (config) => {
    return config.url && config.proxy && config.allPosts && config.params;
};
exports.isConfig = isConfig;
