"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCash = exports.writeCash = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writeCash = async (data) => {
    fs_1.default.writeFile(path_1.default.join(__dirname, "../urls.json"), JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
exports.writeCash = writeCash;
const readCash = async () => {
    return await JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../urls.json")).toString());
};
exports.readCash = readCash;
