import React, { Component } from 'react';

import Gif from '../Gif/Gif';
import { getGifById } from '../../Utils/API';
import Expand from '../../Utils/Expand/Expand';
import classes from './GifDetails.module.css';

class GifDetails extends Component {

	state = {
		url: '',
		alt: '',
		copied: false
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		getGifById(id)
			.then(gif => {
				console.log('gif: ', gif);
				let url = gif.data.data.images.original.url;
				let alt = gif.data.data.title
				this.setState({url, alt});
			});
	}

	copyUrlToClipboard = () => {
		let el = document.createElement('textarea');
		el.value = this.state.url;
		// Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    //toggle button reflecting url has been copied
    this.setState({copied: true});
    setTimeout(() => {
    	this.setState({copied: false});
    }, 1000)
	}

	render() {
		return (
			<div className={classes.GifDetails}>
				<div className={classes.Gif}>
					<Gif url={this.state.url} alt={this.state.alt}/>
					<div style={{height: '20px', marginBottom: '50px'}}>
						{!this.state.copied ? 
							<button 
								className={classes.Button}
								onClick={this.copyUrlToClipboard}>Copy Link</button> 
							: <span 
									role="img"
									aria-label="jsx-a11y/accessible-emoji">&#9989;</span>}
					</div>
					<Expand description="Find Similar"/>
				</div>
			</div>
		);
	}
}

export default GifDetails;

//<input type="text" className={classes.Input} value={this.state.url} readOnly/>


