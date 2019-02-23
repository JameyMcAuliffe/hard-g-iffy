import React from 'react';

import classes from './Gif.module.css';

const gif = (props) => {	
		return (
			<li className={classes.Gif}>	
					<img 
						src={props.url} 
						alt={props.alt}  
						id={props.id}/>
			</li> 
		);
	
};

export default gif;

