import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import "./App.css";

import axios from "axios";

import Login from "./pages/Login/LoginPage.jsx";
import SignUpForm from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard.jsx";
import FeaturesPage from "./pages/Features.jsx";
import Home from "./components/Home.jsx";
import Nav from './components/Nav.jsx';
import Foot from './components/Footer.jsx'


class App extends Component {
  state = {
    loggedIn: false,
	user: null,
	responseCode: null
  };

  componentDidMount = () => {
	axios.get('/auth/user').then(response => {
		console.log(response.data)
		if (!!response.data.user) {
			console.log('THERE IS A USER')
			this.setState({
				loggedIn: true,
				user: response.data.user
			})
		} else {
			this.setState({
				loggedIn: false,
				user: null
			})
		}
	})
}

  login = (email, password) => {
		axios
			.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log("Login response"+response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user,
						responseCode: "200"
					})
					console.log("Logged in user:"+this.user)
				}
			})
			.catch(error => {
				console.log(error.response)
			});
  };
  
  logout = event => {
		event.preventDefault()
		console.log('Logging out...')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	};

  render() {
		return (
			<Router>
				<div>
					<Nav user={this.state.user} loggedIn={this.state.loggedIn} logout={this.logout}/>
					<div className="main-wrapper" style={{marginTop: '6rem'}}>
						<Switch>
							<Route exact path="/" render={() => <Home user={this.state.user} />} />
							<Route exact path="/login" render={() =>
								<Login login={this.login} googleSignin={this.googleSignin} responseCode={this.responseCode}/>}/>
							<Route exact path="/about" component={FeaturesPage} />
							<Route exact path="/signup" render={() =>
								<SignUpForm login={this.login} googleSignin={this.googleSignin} />}/>
							<Route exact path="/dashboard" user={this.state.user} component={Dashboard} />
						</Switch>
					</div>
					<Foot/>
				</div>
			</Router>
		)
	}
}

export default App;
