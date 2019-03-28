import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Search.module.css';


const search = (props) => {
	let disabled = true;
	let query = props.value.split(' ').join('-');
	if(query.trim() !== "") {
		disabled = false;
	}
	let searchLink = `search/${query}`;

	return (
		<div className={classes.Div}>
			<input 
				className={classes.Search} 
				type="text" 
				placeholder="What are you looking for?"
				onChange={props.updateInput}
				value={props.value}></input>
			<Link to={searchLink}><button className={classes.Button} disabled={disabled}>Search</button></Link>
		</div>
	);
}

export default search;
