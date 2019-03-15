import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const header = () => (
	<header className={classes.Header}>
		<nav>
			
			<ul>
				<li className={classes.List}>
					<Link to="/">Home</Link>
				</li>
			</ul>
		</nav>
	</header>
);

export default header;
