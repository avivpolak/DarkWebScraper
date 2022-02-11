export interface GeneralConfig {
    proxy: Proxy;
}
export interface Proxy {
    port: number;
    host: string;
}
export type Db="postgresql" | "mongodb"
