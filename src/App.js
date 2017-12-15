import React, { Component } from "react";
import PropTypes from "prop-types";
import { MPCard } from "src/mp-card";

import "src/App.css";

class App extends Component {
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
				<div className="ui space-around cards">
					{this.props.members.map((mp) => {
						return <MPCard mp={mp} key={`${mp.id}_mp_card_key`} />;
					})}
				</div>
			</div>
		);
	}
}

App.propTypes = {
	members: PropTypes.array
};

export default App;
