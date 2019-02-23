import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Gif from './Gif/Gif';
import classes from './Gifs.module.css';



class Gifs extends Component {

	render() {
		let gifs = this.props.gifsArray.map((g => {
			let fixedUrl = g.images.fixed_height.url;
			let id = g.id;
			let alt = g.title;
			let gifUrl = `/gif/${id}`;
			return <Link to={gifUrl} key={id}><Gif  
								url={fixedUrl}  
								id={id} 
								alt={alt}/></Link>
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
