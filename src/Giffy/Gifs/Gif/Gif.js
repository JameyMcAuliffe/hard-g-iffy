import React from 'react';
import { Link } from 'react-router-dom'

import classes from './Gif.module.css';

const gif = (props) => {

	let gifUrl = `/gif/${props.id}`;
	
		return (
			<li className={classes.Gif}>
				<Link to={gifUrl}>
					<img 
						src={props.url} 
						alt={props.alt} 
						onClick={props.clickedGif} 
						id={props.id}/>
				</Link>
			</li> 
		);
	
};

export default gif;

 
// <Link to="/gif"> </Link>
