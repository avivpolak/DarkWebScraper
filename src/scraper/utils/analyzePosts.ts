import { extractDataFromText } from "./regex";
import { Posts, Post } from "../../types/posts";
import { Params } from "../../types/config";
import { HTMLElement } from "node-html-parser";

const analyzePosts = (posts: HTMLElement[], params: Params): Posts => {
    const analyzedPosts: Posts = [];
    for (let post of posts) {
        try {
            const analyzedPost = analyzePost(post, params);
            if (analyzedPost && Object.keys(analyzedPost).length > 0) {
                analyzedPosts.push(analyzedPost);
            }
        } catch (err) {
            console.log(err);
        }
    }
    return analyzedPosts;
};

const analyzePost = (post: HTMLElement, params: Params): Post | undefined => {
    try {
        const analyzedPost: Post = {};
        for (let param in params) {
            const htmlElement = post.querySelector(params[param].selector);
            if (htmlElement) {
                const htmlText = htmlElement.textContent; 
                if (htmlText) {
                    const post = extractDataFromText(
                        htmlText.trim(),
                        params[param].regex
                    );
                    if (post) {
                        analyzedPost[param] = post;
                    }
                }
            }
        }
        return analyzedPost;
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

export default analyzePosts;
