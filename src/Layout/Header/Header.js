import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const header = () => (
	<nav className={classes.Header}>
		<Link to="/">
			<h3 className={classes.Text}>(Hard G)-iffy</h3>
		</Link>
	</nav>
);

export default header;
