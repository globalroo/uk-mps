import React, { Component } from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";
import { MPCard } from "src/mp-card";

import "src/App.css";
import { CardStack } from "./card-stack/card-stack";import { CardStackControls } from "./card-stack/card-stack-controls";

class App extends Component {
	componentDidMount() {
		const options = {
			postAnimationCallback: this.enableControls
		};
		this.cardStack = new CardStack("stack_krisna",this.mpListRef, options);
		this.controls = new CardStackControls(this.cardStack);
	}

	enableControls = () => {
		this.controls.enable();
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Members of Parliament</h1>
					<p className="App-intro">
						Back to project:{" "}
						<a className="link" href="https://github.com/globalroo/uk-mps">
							uk-mps
						</a>{" "}
						- work in progress for memory game.
					</p>
				</header>
				<div className="mp-container">
					<div className="mp-animation-enclosure">
						<ul id="stack_krisna" ref={(ref) => this.mpListRef = ref} className="stack stack--krisna">

							{this.props.members.map((mp) => {
								return <li className="stack__item" key={`${mp.id}_mp_card_key_li`}>
									<MPCard mp={mp} key={`${mp.id}_mp_card_key`} />
								</li>;
							})}

						</ul>
					</div>
					<div className="controls">
						<button className="button button--sonar button--reject" data-stack="stack_krisna"><i className="fa fa-times"></i><span className="text-hidden">Reject</span></button>
						<button className="button button--sonar button--accept" data-stack="stack_krisna"><i className="fa fa-check"></i><span className="text-hidden">Accept</span></button>
					</div>
				</div>

			</div>
		);
	}
}

App.propTypes = {
	members: PropTypes.array
};

export default App;
