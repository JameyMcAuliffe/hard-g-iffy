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

	componentDidMount() {
		giphyTrending()
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
