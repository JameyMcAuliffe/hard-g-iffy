import axios from 'axios';

const ROOT_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = 'WFYShEMluFwHlUXBJ7Kk7jhGbspo1CC7';

let giphyCall = (input) => {
	axios.get(`${ROOT_URL}${input}&limit=25&api_key=${API_KEY}`)
			.then(results => console.log(results));
}

export {giphyCall};
