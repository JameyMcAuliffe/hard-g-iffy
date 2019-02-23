import React, { Component } from 'react';

import Gif from '../Gif/Gif';
import { getGifById } from '../../Utils/API';

class GifDetails extends Component {

	state = {
		url: ''
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		getGifById(id)
			.then(gif => {
				let url = gif.data.data.images.original.url;
				this.setState({url});
			});
	}

	render() {
		return (
			<Gif url={this.state.url} alt="alt"/>
		);
	}
}

export default GifDetails;

