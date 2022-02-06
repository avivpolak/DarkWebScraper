const axios = require("axios").default;
require("dotenv").config();
const { parse } = require("node-html-parser");
const yaml = require("js-yaml");
const fs = require("fs");0
const path = require("path")
//reading the config file
const readConfig=(configPath)=>{
try {
    const config = yaml.load(fs.readFileSync(path.join(__dirname,configPath), "utf8"));
    console.log(config)
    return config
} catch (error) {
    throw new Error(error)
}
}

// const config = readConfig("../config.yaml")
//getting the data from the url
const getData = async (url) => {
    try {
        const response = await axios.get(url, {
            proxy: config.proxy,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
const extractDataFromText = (text, regex) => {
    if (!regex) return text;
    return text.match(regex);
};
const config = {
    url: 'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all',
    proxy: { port: 8118, host: 'localhost' },
    allPosts: { selector: '.col-sm-12' },
    params: {
      title: { selector: 'h4', regex: '' },
      content: { selector: 'ol', regex: '' },
      author: { selector: '.col-sm-6', regex: /(?<=(w+s){2})(w+)/ },
      date: {
        selector: '.col-sm-6',
        regex: /d+s[a-zA-Z]+sd+,sd+:d+:d+s[a-zA-Z]+/
      }
    }
  }
const scraper = (req, res) => {
    try {
        getData(config.url).then((data) => {
            
            const posts = parse(data).querySelectorAll(
                config.allPosts.selector
            );
      
            const postsArray = [];
            for (let post of posts) {
       
                const NewPost = {};
                try {
                    for (let param in config.params) {
                       console.log(param)
                        NewPost[param] = extractDataFromText(
                            post
                                .querySelector(config.params[param].selector)
                                .text.trim(),
                                config.params[param].regex
                        );
                        console.log(config.params[param].regex)
                    }
                    postsArray.push(NewPost);
                } catch (err) {
                    console.log(err);
                }
            }
            res.json(postsArray);
        });
    } catch (error) {
        res.send(error);
    }
};
module.exports = scraper;
