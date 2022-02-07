"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex_1 = require("./regex");
const analyzePosts = (posts, params) => {
    const analyzedPosts = [];
    for (let post of posts) {
        try {
            const analyzedPost = analyzePost(post, params);
            if (analyzedPost && Object.keys(analyzedPost).length > 0) {
                analyzedPosts.push(analyzedPost);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return analyzedPosts;
};
const analyzePost = (post, params) => {
    try {
        const analyzedPost = {};
        for (let param in params) {
            const htmlElement = post.querySelector(params[param].selector);
            if (htmlElement) {
                const htmlText = htmlElement.textContent;
                if (htmlText) {
                    const post = (0, regex_1.extractDataFromText)(htmlText.trim(), params[param].regex);
                    if (post) {
                        analyzedPost[param] = post;
                    }
                }
            }
        }
        return analyzedPost;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};
exports.default = analyzePosts;
