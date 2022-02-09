import { Config } from "../../types/config";

export const doInParalel = async (
    data: unknown[],
    callBack: Function,
    typeGourd: Function,
    verbToMonitor: string,
    config?:Config
) => {
    let count = 1;
    const promisesList = [];
    for (const part of data) {
        console.clear();
        console.log(verbToMonitor, count, "/", data.length);
        count++;

        if (typeGourd(part)) {
            if(config){
                promisesList.push(callBack({...config,url:part}))
            }
            else{
            promisesList.push(callBack(part));}
        }
    }
    return await Promise.all(promisesList);
};