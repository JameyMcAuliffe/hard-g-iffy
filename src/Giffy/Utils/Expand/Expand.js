import React from 'react';

import classes from './Expand.module.css';
import expandArrow from '../../../assets/images/expand.png';

const expand = (props) => {
	return (
		<div onClick={props.expand} className={classes.Div}>
			<h3 className={classes.H3}>{props.description}</h3>
			<img src={expandArrow} alt="expand arrow"/>
		</div>
	);
}

export default expand;
