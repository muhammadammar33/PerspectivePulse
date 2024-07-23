import axios from "axios";

// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
// const NEWS_API_ENDPOINT =
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=79c41f0094ed41008f2b1b3187d4451e`;

const NEWS_API_ENDPOINT =
    "https://saurav.tech/NewsAPI/everything/cnn.json";

const CRYPTO_API_ENDPOINT =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

export const getNews = async () => {
    let response;

    try {
        response = await axios.get(NEWS_API_ENDPOINT);
        response = response.data.articles.slice(0, 16);
    } catch (error) {}

    return response;
};

export const getCrypto = async () => {
    let response;

    try {
        response = await axios.get(CRYPTO_API_ENDPOINT);

        response = response.data;
    } catch (error) {}

    return response;
};