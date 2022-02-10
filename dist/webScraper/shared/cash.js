"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCash = exports.writeCash = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writeCash = async (data, config) => {
    const dataToSave = { data, config };
    const cashPath = path_1.default.join(__dirname, `../${config.name}.json`);
    fs_1.default.writeFile(cashPath, JSON.stringify(dataToSave), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
exports.writeCash = writeCash;
const readCash = async (configName) => {
    try {
        return await JSON.parse(fs_1.default
            .readFileSync(path_1.default.join(__dirname, `../${configName}.json`))
            .toString());
    }
    catch (error) {
        return undefined;
    }
};
exports.readCash = readCash;
//# sourceMappingURL=cash.js.map