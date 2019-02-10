import React from 'react';

import classes from './Layout.module.css';
import Giffy from '../Giffy/Giffy';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const layout = (props) => (
	<div className={classes.Layout}>
		<Header />
		<Giffy />
		<Footer />
	</div>
);

export default layout;
