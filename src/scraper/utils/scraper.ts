import parse from "node-html-parser";
import { Config } from "../../types/config";
import analyzePosts from "./analyzePosts";
import { fetchData } from "./fetch";

export const scraper = async (config: Config) => {
    const data: unknown = await fetchData(config.url, config.proxy);
    if (typeof data === "string") {
        const parseResult = parse(data);
        if (parseResult) {
            const posts = parseResult.querySelectorAll(
                config.allPosts.selector
            );
            const analyzedPosts = analyzePosts(posts, config.params);
            if (analyzedPosts.length > 0) {
                return analyzedPosts;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
};
