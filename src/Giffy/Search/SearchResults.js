import React, { Component } from 'react';

import Gifs from '../Gifs/Gifs';
import Expand from '../Utils/Expand/Expand';
import Nav from '../../Layout/Nav/Nav';
import { giphySearch } from '../Utils/API';
import classes from './SearchResults.module.css';

class SearchResults extends Component {

	state={
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20,
		addedGifs: 20,
		showExpand: true,
		showNoResults: false
	}

	
	componentDidMount() {
		//check to make sure query exists
		if(this.props.match.params.query) {
			let searchQuery = this.props.match.params.query.split('-').join(' ') || "";
			giphySearch(searchQuery)
				.then(results => {
					let giphyArray = results.data.data;
					if(giphyArray.length !== 0) {
						let partialArray = [];
						for(let i = 0; i < this.state.numDisplayed; i++) {
							partialArray.push(giphyArray[i]);
						}
						this.setState({
							gifsArray: giphyArray,
							partialArray: partialArray,
							showNoResults: false
						});
						//if giphyArray is empty, show no results message
					} else {
						this.setState({showNoResults: true});
					}  
				});
			//if query doesn't exist, show no results message
		} else {
			this.setState({showNoResults: true});
		}
	}

	componentDidUpdate() {
		if(this.state.numDisplayed > this.state.partialArray.length && this.state.partialArray.length !== 0) {
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

		let showResults = (
			<div>
				<Gifs gifsArray={this.state.partialArray}/>
				{this.state.showExpand ? <Expand expand={this.showMore} description="More"/> : null}
			</div>
		);

		let noResults = <h1 style={{"color": "#86aeff"}}>No results found</h1>;

		return(
			//if no results, or while call is still being made, screen remains 100%vh
			<div className={this.state.partialArray.length === 0 ? classes.Loading : null}>
				<Nav title="Home" url="/"/>
				<div>{this.state.showNoResults ? noResults : showResults}</div>
			</div>
		);
	}
}

export default SearchResults;
