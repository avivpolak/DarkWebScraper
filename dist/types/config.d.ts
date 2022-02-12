export interface Config {
    name: string;
    url: string;
    useTor: boolean;
    allPosts: AllPosts;
    params: Params;
    maxUrls: number;
}
export interface ReqConfig {
    allPostsSelector: string;
    maxUrls: string;
    name: string;
    param1Name: string;
    param1REGEX: string;
    param1Selector: string;
    param2Name: string;
    param2REGEX: string;
    param2Selector: string;
    param3Name: string;
    param3REGEX: string;
    param3Selector: string;
    param4Name: string;
    param4REGEX: string;
    param4Selector: string;
    url: string;
    useTor: boolean;
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
