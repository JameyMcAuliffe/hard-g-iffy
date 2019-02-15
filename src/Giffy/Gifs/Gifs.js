import React, { Component } from 'react';

import Gif from './Gif/Gif';
import GifDetails from './GifDetails/GifDetails';
import classes from './Gifs.module.css';
import { getGifById } from '../Utils/API';


class Gifs extends Component {

	state = {
		fullUrl: null,
		showGif: false
	}

	gifClick = (e) => {
		let id = e.target.id;
		let showGif = true;
		
		getGifById(id)
			.then(gif => {
				let fullUrl = gif.data.data.images.original.url;
				this.setState({
					showGif, fullUrl
				});

			});
	}

	render() {
		let gifs = this.props.gifsArray.map((g => {
			let fixedUrl = g.images.fixed_height.url;
			let id = g.id;
			let alt = g.images.title;
			return <Gif 
								key={id} 
								url={fixedUrl} 
								alt={alt} 
								id={id} 
								clickedGif={this.gifClick}/>
		}));

		let gifList = <ul className={classes.Gifs}>{gifs}</ul>;

		return (
			<div>
				{!this.state.showGif ? gifList : <GifDetails url={this.state.fullUrl} alt="altern"/>}
			</div>
		);
	}
}

export default Gifs;
