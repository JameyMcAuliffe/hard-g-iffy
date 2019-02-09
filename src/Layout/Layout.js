import React from 'react';

import classes from './Layout.module.css';
import Giffy from '../Giffy/Giffy';

const layout = (props) => (
	<div className={classes.Layout}>
		<Giffy />
	</div>
);

export default layout;
