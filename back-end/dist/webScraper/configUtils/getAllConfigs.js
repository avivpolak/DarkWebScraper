"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllConfigs = void 0;
const typeGourds_1 = require("../../types/typeGourds");
const configReader_1 = require("../shared/configReader");
const fs = require("fs");
const path = require("path");
const getAllConfigs = async () => {
    //get all configs from fs
    const configs = fs.readdirSync(path.join(__dirname, "../../../configs/sites"));
    const allConfigs = [];
    for (const config of configs) {
        const configObj = await (0, configReader_1.readConfig)(`../../../configs/sites/${config}`);
        if (configObj && (0, typeGourds_1.isConfig)(configObj)) {
            allConfigs.push(configObj);
        }
    }
    return allConfigs;
};
exports.getAllConfigs = getAllConfigs;
//# sourceMappingURL=getAllConfigs.js.map