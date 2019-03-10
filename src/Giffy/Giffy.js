import React, { Component } from 'react';

import Search from './Search/Search';
import Gifs from './Gifs/Gifs';
import { giphySearch, giphyTrending } from './Utils/API';

class Giffy extends Component {
	state = {
		userInput: '',
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20
	}

	//state for full array and partial array
	componentDidMount() {
		giphyTrending()
			.then(results => {
				let giphyArray = results.data.data;
				let partialArray = [];
				for(let i = 0; i < this.state.numDisplayed; i++) {
					partialArray.push(giphyArray[i]);
				}
				console.log('partialArray: ', partialArray);
				console.log('giphyArray: ', giphyArray);
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
		let newNumDisplayed = this.state.numDisplayed + 20;
		this.setState({numDisplayed: newNumDisplayed});
	}

	searchCall = () => {
		giphySearch(this.state.userInput)
			.then(results => {
				let giphyArray = results.data.data;
				this.setState({gifsArray: giphyArray});
			});
		this.setState({userInput: ''});
	}

	updateInput = (e) => {
		let updatedInput = e.target.value;
		this.setState({userInput: updatedInput});
	}

	render() {
		return (
			<div>
				<Search
					 searchCall={this.searchCall}
					 updateInput={this.updateInput}
					 value={this.state.userInput}/>
				<Gifs gifsArray={this.state.partialArray}/>
				<button onClick={this.showMore}>More</button>
			</div>
		);
	}
}

export default Giffy;
