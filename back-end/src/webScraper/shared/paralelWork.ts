import { Config } from "../../types/config";
import { bar } from "./progressBar";

export const doInParalel = async (
    data: unknown[],
    callBack: Function,
    typeGourd: Function,
    verbToMonitor: string,
    config?: Config
) => {
    try {
        const progressBar = bar(verbToMonitor + ":");
        if (verbToMonitor) {
            progressBar.start(data.length, 0);
        }

        const promisesList = [];
        for (const part of data) {
            if (typeGourd(part)) {
                if (config) {
                    promisesList.push(
                        callBack({ ...config, url: part })
                            .then((res: any) => {
                                if (verbToMonitor) {
                                    progressBar.update(progressBar.value + 1);
                                }
                                return res;
                            })
                    );
                } else {
                    promisesList.push(
                        callBack(part)
                            .then((res: any) => {
                                if (verbToMonitor) {
                                    progressBar.update(progressBar.value + 1);
                                }
                                return res;
                            })
                    );
                }
            }
        }
        return [await Promise.all(promisesList), progressBar];
    } catch (error) {
        throw error;
    }
};
