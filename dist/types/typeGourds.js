"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWebsite = exports.isPaste = exports.isPastes = exports.isConfig = exports.isString = void 0;
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
const isWebsite = (data) => {
    const { enrtyUrl, urls } = data;
    return ((0, exports.isString)(urls) &&
        urls.length < 2703 &&
        (0, exports.isString)(enrtyUrl));
};
exports.isWebsite = isWebsite;
