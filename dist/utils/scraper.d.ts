import { Config } from "../types/config";
export declare const scraper: (config: Config) => Promise<import("../types/posts").Posts | undefined>;
