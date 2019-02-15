import axios from 'axios';

const ROOT_URL = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'WFYShEMluFwHlUXBJ7Kk7jhGbspo1CC7';
const SEARCH = 'search?q=';
const TRENDING = 'trending?'

let giphySearch = (input) => {
	return axios.get(`${ROOT_URL}${SEARCH}${input}&limit=20&api_key=${API_KEY}`);
}

let giphyTrending = () => {
	return axios.get(`${ROOT_URL}${TRENDING}&limit=20&api_key=${API_KEY}`);
}

let getGifById = (id) => {
	return axios.get(`${ROOT_URL}${id}?api_key=${API_KEY}`);
}

export {giphySearch, giphyTrending, getGifById};
