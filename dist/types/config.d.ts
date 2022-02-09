export interface Config {
    url: string;
    proxy: Proxy;
    allPosts: AllPosts;
    params: Params;
    maxUrls: number;
}
export interface Proxy {
    port: number;
    host: string;
}
export interface AllPosts {
    selector: string;
}
export interface Param {
    selector: string;
    regex: RegExp;
}
export interface Params {
    [key: string]: Param;
}
