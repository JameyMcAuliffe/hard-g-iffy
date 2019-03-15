import React, { Component } from 'react';

import Gif from '../Gif/Gif';
import Gifs from '../Gifs';
import { getGifById, giphySearch } from '../../Utils/API';
import Expand from '../../Utils/Expand/Expand';
import classes from './GifDetails.module.css';

class GifDetails extends Component {

	state = {
		url: '',
		alt: '',
		copied: false,
		similarQuery: null,
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20,
		addedGifs: 20,
		showExpand: true,
		showSimilar: true
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		getGifById(id)
			.then(gif => {
				console.log('gif: ', gif);
				let url = gif.data.data.images.original.url;
				let alt = gif.data.data.title;
				let similarQuery = gif.data.data.title;
				this.setState({url, alt, similarQuery});
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

	copyUrlToClipboard = () => {
		let el = document.createElement('textarea');
		el.value = this.state.url;
		// Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    //toggle button reflecting url has been copied
    this.setState({copied: true});
    setTimeout(() => {
    	this.setState({copied: false});
    }, 1000)
	}

	findSimilar = () => {
		giphySearch(this.state.similarQuery)
			.then(results => {
				let giphyArray = results.data.data;
				let partialArray = [];
				for(let i = 0; i < this.state.numDisplayed; i++) {
					partialArray.push(giphyArray[i]);
				}
				this.setState({
					gifsArray: giphyArray,
					partialArray: partialArray,
					showSimilar: false
				});
			});

	}

	render() {
		return (
			<div className={this.state.showSimilar ? classes.GifDetails_1 : classes.GifDetails_2}>
				<div className={classes.Gif}>
					<Gif url={this.state.url} alt={this.state.alt}/>
					<div style={{height: '20px', marginBottom: '50px'}}>
						{!this.state.copied ? 
							<button 
								className={classes.Button}
								onClick={this.copyUrlToClipboard}>Copy Link</button> 
							: <span 
									role="img"
									aria-label="jsx-a11y/accessible-emoji">&#9989;</span>}
					</div>
					
					{!this.state.showSimilar ? <Gifs gifsArray={this.state.partialArray}/> : <Expand description="Find Similar" expand={this.findSimilar}/>}
					{!this.state.showSimilar && this.state.showExpand ? <Expand description="More" expand={this.showMore}/> : null}
				</div>
			</div>
		);
	}
}

export default GifDetails;

//<input type="text" className={classes.Input} value={this.state.url} readOnly/>


