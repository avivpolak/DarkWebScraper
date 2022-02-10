"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeGourds_1 = require("../types/typeGourds");
const scraper_1 = __importDefault(require("./scraper/scraper"));
const configReader_1 = require("./shared/configReader");
const run = async () => {
    // const configYamls = fs.readdirSync(path.join(__dirname, "../../configs/sites"));
    // for (const configYaml of configYamls) {
    // const config = await readConfig(`../../../configs/sites/${configYaml}`);
    const config = await (0, configReader_1.readConfig)(`../../../configs/sites/pastebin.yaml`);
    if (config && (0, typeGourds_1.isConfig)(config)) {
        (0, scraper_1.default)(config);
    }
    // }
};
run();
//# sourceMappingURL=index.js.map