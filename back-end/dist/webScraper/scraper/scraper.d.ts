import { Config } from "../../types/config";
declare const scrape: (config: Config) => Promise<void>;
export declare const custumScrape: (config: Config) => Promise<unknown[] | undefined>;
export default scrape;
