import axios from 'axios';

const ROOT_URL = 'http://api.giphy.com/v1/gifs/';
const API_KEY = 'WFYShEMluFwHlUXBJ7Kk7jhGbspo1CC7';
const SEARCH = 'search?q=';
const TRENDING = 'trending?'

let giphySearch = (input) => {
	//returns Trending search if no title present for find similar query
	if (input.trim() === "") {
		return giphyTrending();
	} else {
		return axios.get(`${ROOT_URL}${SEARCH}${input}&limit=200&api_key=${API_KEY}`);
	}
}

let giphyTrending = () => {
	return axios.get(`${ROOT_URL}${TRENDING}&limit=200&api_key=${API_KEY}`);
}

let getGifById = (id) => {
	return axios.get(`${ROOT_URL}${id}?api_key=${API_KEY}`);
}

export {giphySearch, giphyTrending, getGifById};
