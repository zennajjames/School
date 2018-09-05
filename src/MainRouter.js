import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Nav from './core/Nav';
import Home from "./core/Home";
import FeaturesPage from "./pages/Features.jsx";

import Login from "./pages/LoginPage";
import SignUpForm from "./user/SignUpPage";
import Dashboard from "./pages/Dashboard.jsx";

import Foot from './core/Footer'


class MainRouter extends Component {
  state = {
    loggedIn: false,
    user: null,
    userID: null,
    responseCode: null,
    redirectTo: null
  }; 

  render() {
		return (
			<div>
				<Nav user={this.state.user} loggedIn={this.state.loggedIn} logout={this.logout}/>
				<div className="main-wrapper" style={{marginTop: '6rem'}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" render={() =>
							<Login login={this.login} googleSignin={this.googleSignin} responseCode={this.responseCode}/>}/>
						<Route exact path="/about" component={FeaturesPage} />
						<Route exact path="/signup" render={() =>
							<SignUpForm login={this.login} googleSignin={this.googleSignin} />}/>
						<Route exact path="/dashboard" render={() => 
							<Dashboard user={this.state.user} id={this.state.userID}/>} />
					</Switch>
				</div>
				<Foot/>
			</div>
		);
	}
}

export default MainRouter;

