import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Nav from './core/Nav';
import Home from "./core/Home";
import Courses from "./pages/Courses.jsx";

import LogIn from "./user/Login.jsx";
import Register from "./user/Register.jsx";

import SocialPage from "./user/profile/SocialPage.jsx";
import EditProfile from "./user/profile/EditProfile.jsx";
import Users from './user/Users.jsx'

import Profile from "./user/profile/Profile.jsx";
import PrivateRoute from './auth/PrivateRoute'

import Foot from './core/Footer'


class MainRouter extends Component {

  render() {
		return (
			<div style={{backgroundImage: 'url(/assets/images/blue.jpg)'}}>
				<Nav/>
				<div className="main-wrapper" style={{paddingTop: '8rem', paddingBottom: '4rem'}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={LogIn}/>
						<Route exact path="/courses" component={Courses}/>
						<Route exact path="/users" component={Users} />
						<Route exact path="/social" component={SocialPage} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/user/:userId" component={Profile} />
						<PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
					</Switch>
				</div>
				<Foot/>
			</div>
		);
	}
}

export default MainRouter;

