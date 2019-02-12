import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const header = () => (
	<header>
		<nav className={classes.Header}>
			<h3>(Hard G)iffy</h3>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
			</ul>
		</nav>
	</header>
);

export default header;
