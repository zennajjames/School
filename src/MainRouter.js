import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import axios from "axios";

import Nav from './components/Nav.jsx';
import Home from "./pages/Home.jsx";
import FeaturesPage from "./pages/Features.jsx";

import Login from "./pages/Login/LoginPage.jsx";
import SignUpForm from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard.jsx";
import SocialPage from "./pages/SocialPage.jsx";


import Foot from './components/Footer.jsx'


class MainRouter extends Component {
  state = {
    loggedIn: false,
    user: null,
    userID: null,
    responseCode: null,
    redirectTo: null
  };

  componentDidMount = () => {
    axios.get('/auth/user').then(response => {
      console.log(response.data)
      if (!!response.data.user) {
        console.log('User logged in.')
        this.setState({
          loggedIn: true,
          user: response.data.user.firstName,
          userID: response.data.user._id
        })
        console.log(this.state.userID)
      } else {
        this.setState({
          loggedIn: false,
          user: null
        })
      }
    })
  }

  login = (username, password) => {
	console.log(username,password)
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user.firstName,
						responseCode: "200",
						redirectTo: "/dashboard"
					})
					console.log("Logged in user:")
					console.log(this.state.user)
				}
			})
    };
  
  logout = event => {
		event.preventDefault()
		console.log('Logging out...')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null,
					redirectTo: "/"
				})
			}
		})
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
							<Route exact path="/feed" component={SocialPage} />
						</Switch>
					</div>
					<Foot/>
				</div>
		);
	}
}

export default MainRouter;

