"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaste = exports.isPastes = exports.isConfig = exports.isString = void 0;
const isString = (str) => {
    return typeof str === "string";
};
exports.isString = isString;
const isConfig = (config) => {
    return config.url && config.proxy && config.allPosts && config.params;
};
exports.isConfig = isConfig;
const isPastes = (pastes) => {
    return typeof pastes === "object";
};
exports.isPastes = isPastes;
const isPaste = (paste) => {
    return typeof paste === "object";
};
exports.isPaste = isPaste;
