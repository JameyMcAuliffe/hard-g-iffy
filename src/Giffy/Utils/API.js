import axios from 'axios';

const ROOT_URL = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'WFYShEMluFwHlUXBJ7Kk7jhGbspo1CC7';
const search = 'search?q=';
const trending = 'trending?'

let giphySearch = (input) => {
	return axios.get(`${ROOT_URL}${search}${input}&limit=20&api_key=${API_KEY}`);
}

let giphyTrending = () => {
	return axios.get(`${ROOT_URL}${trending}&limit=20&api_key=${API_KEY}`);
}

export {giphySearch, giphyTrending};
