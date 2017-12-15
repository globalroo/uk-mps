import React, { Component } from "react";
import PropTypes from "prop-types";
import { MPCard } from "src/mp-card";

// These css imports are breaking testing. checkout babel-jest and these webpack options
// https://facebook.github.io/jest/docs/en/webpack.html
// One of the projects must have these settings already - an ejected one?

import "src/App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Members of Parliament - getting data ready for memory game</h1>
					<p className="App-intro">
						Back to project:
						<a className="link" href="https://github.com/globalroo/uk-mps">
							uk-mps
						</a>
					</p>
				</header>

				<div className="ui space-around cards">
					{this.props.members.map((mp, ix) => {
						return <MPCard mp={mp} key={`${mp.id}_mp_card_key`} />;
					})}
				</div>

			</div>
		);
	}
}

App.propTypes = {
	members: PropTypes.object
};

export default App;
