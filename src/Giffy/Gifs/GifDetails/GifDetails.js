import React, { Component } from 'react';

import Gif from '../Gif/Gif';
import { getGifById } from '../../Utils/API';

class GifDetails extends Component {

	state = {
		url: '',
		alt: ''
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		getGifById(id)
			.then(gif => {
				let url = gif.data.data.images.original.url;
				let alt = gif.data.data.title
				this.setState({url, alt});
			});
	}

	render() {
		return (
			<Gif url={this.state.url} alt={this.state.alt}/>
		);
	}
}

export default GifDetails;

