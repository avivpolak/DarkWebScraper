const axios = require("axios").default
//getting the data from the url
const fetchData = async (url, proxy) => {
    try {
        const response = await axios.get(url, {
            proxy,
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {fetchData}