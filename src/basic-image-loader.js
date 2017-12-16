import React, { Component } from "react";
import PropTypes from "prop-types";

export class BasicImageLoader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			loaded: false
		};
	}
	onLoad = () => {
		this.setState({
			loaded: true
		});
	}
	onError = () => {
		this.setState({
			error: true
		});
	}
	render() {
		const style = this.state.error ? { display: "none", opacity: 0 } : { opacity: (this.state.loaded ? 1 : 0 ) };
		return <img className="mp-image" style={style} src={this.props.src} onLoad={this.onLoad} onError={this.onError} alt={this.props.alt}/>;
	}
}

BasicImageLoader.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	styles: PropTypes.object
};
