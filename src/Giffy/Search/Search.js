import React from 'react';

import classes from './Search.module.css';


const search = (props) => (
	<div className={classes.Div}>
		<input 
			className={classes.Search} 
			type="text" 
			placeholder="What are you looking for?"
			onChange={props.updateInput}
			value={props.value}></input>
		<button 
			className={classes.Button}
			onClick={props.searchCall}>Search</button>
	</div>
);

export default search;
