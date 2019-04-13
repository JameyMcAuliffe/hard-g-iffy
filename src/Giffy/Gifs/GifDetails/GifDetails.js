import React, { Component } from 'react';

import Gif from '../Gif/Gif';
import Gifs from '../Gifs';
import Nav from '../../../Layout/Nav/Nav';
import { getGifById, giphySearch } from '../../Utils/API';
import Expand from '../../Utils/Expand/Expand';
import CheckUrl from '../../../assets/images/check.png';
import classes from './GifDetails.module.css';

class GifDetails extends Component {

	state = {
		url: '',
		alt: '',
		id: '',
		copied: false,
		similarQuery: null,
		gifsArray: [],
		partialArray: [],
		numDisplayed: 20,
		addedGifs: 20,
		showExpand: true,
		showSimilar: true,
		noMatchesFound: false
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		getGifById(id)
			.then(gif => {
				let url = gif.data.data.images.original.url;
				let alt = gif.data.data.title;
				let similarQuery = gif.data.data.title;
				this.setState({url, alt, similarQuery, id});
			});
	}

	componentDidUpdate() {
		let id = this.props.match.params.id;

		if (this.state.id !== id) {
			this.setState({showSimilar: true, id});
			
			getGifById(id)
			.then(gif => {
				let url = gif.data.data.images.original.url;
				let alt = gif.data.data.title;
				let similarQuery = gif.data.data.title;
				this.setState({url, alt, similarQuery});
			});	
		}

		

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

	//a lot of code to copy gif link to clipboard
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

	render() {
		return (
			<div>
				<Nav title="Home" url="/"/>
				<div className={this.state.showSimilar ? classes.GifDetails_1 : classes.GifDetails_2}>
					<div className={classes.Gif}>
						<Gif url={this.state.url} alt={this.state.alt}/>
						<div style={{height: '20px', marginBottom: '50px'}}>
							{!this.state.copied ? 
								<button 
									className={classes.Button}
									onClick={this.copyUrlToClipboard}>Copy Link</button> 
								: <img src={CheckUrl} alt="check-mark" style={{"width": "45px"}}/>}
						</div>
						{!this.state.showSimilar ? <Gifs gifsArray={this.state.partialArray}/> : <Expand description="Find Similar" expand={this.findSimilar}/>}
						{!this.state.showSimilar && this.state.showExpand ? <Expand description="More" expand={this.showMore}/> : null}
					</div>
				</div>
			</div>
		);
	}
}

export default GifDetails;

