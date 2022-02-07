import { Posts } from "../../types/posts";
import { Params } from "../../types/config";
import { HTMLElement } from "node-html-parser";
declare const analyzePosts: (posts: HTMLElement[], params: Params) => Posts;
export default analyzePosts;
