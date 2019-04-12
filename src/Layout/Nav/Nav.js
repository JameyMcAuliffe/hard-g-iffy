import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Nav.module.css';

const Nav = (props) => {
	return (
		<div className={classes.Nav}>
			<Link to={props.url} className={classes.Link}>
				<h3>{props.title}</h3>
			</Link>
		</div>
	);
};

export default Nav;
