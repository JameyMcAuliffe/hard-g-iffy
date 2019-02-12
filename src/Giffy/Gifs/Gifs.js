import React from 'react';

import Gif from './Gif/Gif';
import classes from './Gifs.module.css';


const gifs = (props) => {

	let gifClick = (e) => {
		console.log(e.target.id);
	}

	let gifs = props.gifsArray.map((g => {
		//add real sized url
		let gifUrl = g.images.fixed_height.url;
		let id = g.id;
		let alt = g.images.title;
		return <Gif key={id} url={gifUrl} alt={alt} id={id} clickedGif={gifClick}/>
	}));

	return (
		<div>
			<ul className={classes.Gifs}>
				{gifs}
			</ul>
		</div>
	);
}

export default gifs;
