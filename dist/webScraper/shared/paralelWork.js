"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doInParalel = void 0;
const doInParalel = async (data, callBack, typeGourd, verbToMonitor, config) => {
    let count = 1;
    const promisesList = [];
    for (const part of data) {
        console.clear();
        console.log(verbToMonitor, count, "/", data.length);
        count++;
        if (typeGourd(part)) {
            if (config) {
                promisesList.push(callBack({ ...config, url: part }));
            }
            else {
                promisesList.push(callBack(part));
            }
        }
    }
    return await Promise.all(promisesList);
};
exports.doInParalel = doInParalel;
//# sourceMappingURL=paralelWork.js.map