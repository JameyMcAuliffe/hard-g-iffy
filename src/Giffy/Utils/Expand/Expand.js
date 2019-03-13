import React from 'react';

import classes from './Expand.module.css';

const expand = (props) => {
	return (
		<div onClick={props.expand} className={classes.Div}>
			<h3 className={classes.H3}>{props.description}</h3>
			<img src={props.src} alt={props.alt}/>
		</div>
	);
}

export default expand;
