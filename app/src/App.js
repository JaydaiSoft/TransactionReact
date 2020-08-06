import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/Home';
import TransactionUpload from './components/TransactionUpload'
import './App.css';

class App extends Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<Router basename="/2C2P">
					<div>
						<Nav />
						<Switch>
							<Route path="/Home" component={Home} />
              <Route path="/TransactionUpload" component={TransactionUpload} />
							<Route component={Home} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
