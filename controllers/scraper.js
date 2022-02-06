require("dotenv").config();
const { parse } = require("node-html-parser");
const { fetchData } = require("../utils/fetch");
const analyzePosts=require("../utils/analyzePosts")
const { readConfig } = require("../utils/readConfig");
const config = require("../mockConfig"); //currently there is problrm with getting the regex as regex from yaml

const scraper = async (req, res) => {
    try {
        const data = await fetchData(config.url, config.proxy);
        const posts = parse(data).querySelectorAll(config.allPosts.selector);
        res.json(analyzePosts(posts,config.params));
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server Error");
    }
};



module.exports = scraper;
