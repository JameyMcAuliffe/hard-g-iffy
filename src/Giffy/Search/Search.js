import React, { Component } from 'react';

import classes from './Search.module.css';
import { giphyCall } from '../Utils/API';

class Search extends Component {
	state = {
		searchTerm: ''
	}

	searchTerm = () => {
		giphyCall(this.state.searchTerm);
		this.setState({searchTerm: ''});
	}

	updateInput = (e) => {
		let updatedInput = e.target.value;
		this.setState({searchTerm: updatedInput});
	}

	render() {
		return (
			<div className={classes.Div}>
				<input 
					className={classes.Search} 
					type="text" 
					placeholder="What are you looking for?"
					onChange={this.updateInput}
					value={this.state.searchTerm}></input>
				<button 
					className={classes.Button}
					onClick={this.searchTerm}>Search</button>
			</div>
		);
	}
}

export default Search;
