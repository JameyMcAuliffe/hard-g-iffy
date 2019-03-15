import React, { Component } from 'react';

import Gifs from '../Gifs/Gifs';
import Expand from '../Utils/Expand/Expand';
import { giphySearch } from '../Utils/API';

class SearchResults extends Component {

	state={
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20,
		addedGifs: 20,
		showExpand: true
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

	componentDidUpdate() {
		if(this.state.numDisplayed > this.state.partialArray.length) {
			let addedPartialArray = [];
			for(let i = 0; i < this.state.numDisplayed; i++) {
				addedPartialArray.push(this.state.gifsArray[i]);
			}
			this.setState({partialArray: addedPartialArray});
		}
	}

	showMore = () => {
		let newNumDisplayed = this.state.numDisplayed + this.state.addedGifs;
		this.setState({numDisplayed: newNumDisplayed});
		if(this.state.numDisplayed >= this.state.gifsArray.length - this.state.addedGifs) {
			this.setState({showExpand: false});
		}
	}

	render() {

		return(
			<div>
				<Gifs gifsArray={this.state.partialArray}/>
				{this.state.showExpand ? <Expand expand={this.showMore} description="More"/> : null}
			</div>
		);
	}
}

export default SearchResults;
