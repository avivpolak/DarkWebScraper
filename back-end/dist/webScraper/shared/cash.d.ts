import { Config } from "../../types/config";
import { Cash } from "../../types/general";
export declare const writeCash: (data: string[], config: Config) => Promise<void>;
export declare const readCash: (configName: string) => Promise<Cash | undefined>;
