import React, { Component } from "react";
import { formattedData } from "data/processed.js";
import "src/App.css";

class MPImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			src: this.props.url
		};
	}
	onError = e => {
		this.setState({ src: "images/404.jpeg" });
		e.stopPropagation();
	};

	render() {
		return <img className="mp-image" onError={this.onError} src={this.state.src} alt={this.props.alt} />;
	}
}

const MPData = ({ id, data }) => {
	//TODO: add more meta - const { additionalName, constituency, gender, homePage, party, twitter } = data;
	//TODO: Separate into component file
	const { constituency, party } = data;
	const partyText = party._value;
	const { label } = constituency;
	const constituencyText = label._value;
	return [
		<h3 key={`${id}_party`} className="member-party">
			{partyText}
		</h3>,
		<h3 className="member-constituency" key={`${id}_constituency`}>
			{constituencyText}
		</h3>
	];
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mps: []
		};
	}

	async componentDidMount() {
		// TODO: Optimise parsing - make node parse for this to consume?
		// Serving from processed data produced by flattenData.
		// const cachedMPs = await getCachedMembers();
		// const mps = cachedMPs ? JSON.parse(cachedMPs) : await flattenData(this.props.members);
		const mps = formattedData;
		//TODO: save sorted formattedData or make util to sort based on name / place
		mps.sort((a, b) => {
			if (a.familyName < b.familyName) return -1;
			if (a.familyName > b.familyName) return 1;
			return 0;
		});
		this.setState({
			mps
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Members of Parliament</h1>
					<p className="App-intro">Sunday evening shennanigans</p>
				</header>
				<section className="members-of-parliament">
					{this.state.mps.map((mp, ix) => {
						return (
							<div className="member" key={`${mp.id}_key`}>
								<MPImage url={mp.image} alt={mp.name} key={`${mp.id}_image`} />
								<div className="member-info" key={`${mp.id}_info`}>
									<h2 key={`${mp.id}_title`}>{mp.fullNameByForename}</h2>
									<MPData key={`${mp.id}_data`} data={mp.data} id={mp.id} />
								</div>
							</div>
						);
					})}
				</section>
			</div>
		);
	}
}

export default App;
