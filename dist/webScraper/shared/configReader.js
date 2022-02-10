"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = void 0;
const yaml_1 = __importDefault(require("yaml"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const typeGourds_1 = require("../../types/typeGourds");
const readConfig = async (configPath) => {
    try {
        const config = await yaml_1.default.parse(fs.readFileSync(path_1.default.join(__dirname, configPath), "utf8"));
        console.log(config);
        if ((0, typeGourds_1.isConfig)(config)) {
            return makeItRegex(config);
        }
        else
            return undefined;
    }
    catch (error) {
        console.log(error);
        if ((0, typeGourds_1.isString)(error)) {
            throw new Error(error);
        }
    }
};
exports.readConfig = readConfig;
const makeItRegex = (config) => {
    const newConfig = config;
    Object.keys(newConfig.params).forEach(param => {
        newConfig.params[param].regex = new RegExp(newConfig.params[param].regex);
    });
    return newConfig;
};
//# sourceMappingURL=configReader.js.map