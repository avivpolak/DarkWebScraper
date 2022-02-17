import { Config } from "../../types/config";
export declare const doInParalel: (data: unknown[], callBack: Function, typeGourd: Function, verbToMonitor: string, config?: Config | undefined) => Promise<any[]>;
