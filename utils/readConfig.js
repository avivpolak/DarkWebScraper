const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const readConfig = (configPath) => {
    try {
        const config = yaml.load(
            fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
        return config;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { readConfig };
