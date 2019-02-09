import React from 'react';

import classes from './Gif.module.css';

const gif = (props) => (
	<li className={classes.Gif}>
		<img src={props.url} alt={props.alt}/>
	</li> 
);

export default gif;
