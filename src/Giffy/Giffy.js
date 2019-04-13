import React, { Component } from 'react';

import Search from './Search/Search';
import Gifs from './Gifs/Gifs';
import Expand from './Utils/Expand/Expand';
import { giphyTrending } from './Utils/API';
import classes from './Giffy.module.css';

class Giffy extends Component {
	state = {
		userInput: '',
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20,
		addedGifs: 20,
		showExpand: true
	}

	//Calls Giphy API with trending search
	componentDidMount() {
		giphyTrending()
			.then(results => {
				//stores full array of returned gifs
				let giphyArray = results.data.data;
				//stores displayed gifs in increments of 20
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
		//checks to see if numDisplayed has been increased
		if(this.state.numDisplayed > this.state.partialArray.length) {
			let addedPartialArray = [];
			//partialArray now includes increased number of gifs
			for(let i = 0; i < this.state.numDisplayed; i++) {
				addedPartialArray.push(this.state.gifsArray[i]);
			}
			this.setState({partialArray: addedPartialArray});
		}
	}

	showMore = () => {
		//adds 20 to numDisplayed
		let newNumDisplayed = this.state.numDisplayed + this.state.addedGifs;
		this.setState({numDisplayed: newNumDisplayed});
		//check to protect against trying to display more gifs than in full array
		if(this.state.numDisplayed >= this.state.gifsArray.length - this.state.addedGifs) {
			this.setState({showExpand: false});
		}
	}

	updateInput = (e) => {
		let updatedInput = e.target.value;
		this.setState({userInput: updatedInput});
	}

	render() {
		return (
			<div className={this.state.partialArray.length === 0 ? classes.Loading : null}>
				<Search
					 updateInput={this.updateInput}
					 value={this.state.userInput}/>
				<Gifs gifsArray={this.state.partialArray}/>
				{this.state.showExpand ? <Expand expand={this.showMore} description="More"/> : null}
			</div>
		);
	}
}

export default Giffy;
