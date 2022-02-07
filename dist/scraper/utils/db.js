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
exports.readFromDb = exports.saveToDb = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const saveToDb = async (data) => {
    //open new diractory to save the data
    const currentDate = Date.now().toString();
    const dir = path_1.default.join(__dirname, "../../../../darkwebDb/");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    //save the data to the file
    const filePath = path_1.default.join(dir, `${currentDate}.json`);
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    });
};
exports.saveToDb = saveToDb;
const readFromDb = async () => {
    try {
        const dir = path_1.default.join(__dirname, "../../../../darkwebDb/");
        const files = fs.readdirSync(dir);
        const data = {};
        for (let file of files) {
            const filePath = path_1.default.join(dir, file);
            const extractedFile = await fs.readFileSync(filePath, "utf8");
            data[file] = JSON.parse(extractedFile);
        }
        return data;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.readFromDb = readFromDb;
