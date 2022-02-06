const extractDataFromText = (text, regex) => {
    try {
        if (!regex) return text;
        return text.match(regex)[0].trim();
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { extractDataFromText };
