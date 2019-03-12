import React, { Component } from 'react';

import Gifs from '../Gifs/Gifs';
import { giphySearch } from '../Utils/API';

class SearchResults extends Component {

	state={
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20
	}

	componentDidMount() {
		let searchQuery = this.props.match.params.query.split('-').join(' ');
		giphySearch(searchQuery)
			.then(results => {
				let giphyArray = results.data.data;
				let partialArray = [];
				for(let i = 0; i < this.state.numDisplayed; i++) {
					partialArray.push(giphyArray[i]);
				}
				this.setState({
					gifsArray: giphyArray,
					partialArray: partialArray
				});
			});
	}

	render() {

		return(
			<Gifs gifsArray={this.state.partialArray}/>
		);
	}
}

export default SearchResults;
