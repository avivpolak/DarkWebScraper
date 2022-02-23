"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doInParalel = void 0;
const progressBar_1 = require("./progressBar");
const doInParalel = async (data, callBack, typeGourd, verbToMonitor, config) => {
    try {
        const progressBar = (0, progressBar_1.bar)(verbToMonitor + ":");
        if (verbToMonitor) {
            progressBar.start(data.length, 0);
        }
        const promisesList = [];
        for (const part of data) {
            if (typeGourd(part)) {
                if (config) {
                    promisesList.push(callBack({ ...config, url: part })
                        .then((res) => {
                        if (verbToMonitor) {
                            progressBar.update(progressBar.value + 1);
                        }
                        return res;
                    }));
                }
                else {
                    promisesList.push(callBack(part)
                        .then((res) => {
                        if (verbToMonitor) {
                            progressBar.update(progressBar.value + 1);
                        }
                        return res;
                    }));
                }
            }
        }
        return [await Promise.all(promisesList), progressBar];
    }
    catch (error) {
        throw error;
    }
};
exports.doInParalel = doInParalel;
//# sourceMappingURL=paralelWork.js.map