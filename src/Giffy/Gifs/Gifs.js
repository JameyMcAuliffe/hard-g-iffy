import React, { Component } from 'react';

import Gif from './Gif/Gif';
//import GifDetails from './GifDetails/GifDetails';
import classes from './Gifs.module.css';



class Gifs extends Component {

	// state = {
	// 	fullUrl: null,
	// 	showGif: false
	// }

	//gifClick = (e) => {
		//let id = e.target.id;
		//let showGif = true;
		
		

		// 	});
	//}

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
				{gifList}
			</div>
		);
	}
}

export default Gifs;


// {!this.state.showGif ? gifList : <GifDetails url={this.state.fullUrl} alt="altern"/>}
