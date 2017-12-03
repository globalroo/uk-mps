import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GET_ALL_MEMBERS_URL = "https://api.parliament.uk/Live/fixed-query/house_current_members?house_id=1AFu55Hs&format=application/json";
const getMembers = async () => {
	return await fetch(GET_ALL_MEMBERS_URL);
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mps: {}
		}
	}
	componentDidMount() {
		this.setState({
			mps: getMembers()
		})
	}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { JSON.stringify(this.state.mps) }
        </p>
      </div>
    );
  }
}

export default App;
