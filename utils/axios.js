const axios = require('axios');
const util = require('util');

const url = "https://marketdata.tradermade.com/api/v1/live";
const apiKey = "T3-ISo-2ue5SE_QW5VuW";  // Replace with your actual API key

const fetchMarketData = async(forexData) => {

    try {
        const response = await axios.get(url, {
            params: {
                currency: forexData,
                api_key: apiKey
            }
        });

        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error");
        }

    } catch (error) {
        console.error("Error");
    }

}

module.exports = fetchMarketData;