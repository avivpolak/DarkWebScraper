export interface Config {
    name: string;
    url: string;
    useTor: boolean;
    allPosts: AllPosts;
    params: Params;
    maxUrls: number;
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
