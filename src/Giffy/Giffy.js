import React, { Component } from 'react';

import Search from './Search/Search';
import Gifs from './Gifs/Gifs';
import { giphyCall } from './Utils/API';

class Giffy extends Component {
	state = {
		userInput: '',
		gifsArray: []
	}

	searchCall = () => {
		giphyCall(this.state.userInput)
			.then(results => {
				let giphyArray = results.data.data;
				console.log(giphyArray);
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
				<Gifs gifsArray={this.state.gifsArray}/>
			</div>
		);
	}
}

export default Giffy;
