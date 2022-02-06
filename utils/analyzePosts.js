const { extractDataFromText } = require("./regex");
const analyzePosts = (posts, params) => {
    const analyzedPosts = [];
    for (let post of posts) {
        try {
            analyzedPosts.push(analyzePost(post, params));
        } catch (err) {
            console.log(err)
        }
    }
    return analyzedPosts;
};

const analyzePost = (post, params) => {
    try {
        const analyzedPost = {};
        for (let param in params) {
            analyzedPost[param] = extractDataFromText(
                post.querySelector(params[param].selector).text.trim(),
                params[param].regex
            );
        }
        return analyzedPost;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = analyzePosts;
