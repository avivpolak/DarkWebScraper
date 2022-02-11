export interface GeneralConfig {
    proxy: Proxy;
}
export interface Proxy {
    port: number;
    host: string;
}
export declare type Db = "postgresql" | "mongodb";
