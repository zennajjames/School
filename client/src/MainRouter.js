import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'


import Nav from './core/Nav';
import Home from "./core/Home";

import LogIn from "./user/Login.jsx";
import Register from "./user/Register.jsx";
import EditProfile from "./user/profile/EditProfile.jsx";

import CourseHome from './courses/CourseHome'
import Users from './user/Users.jsx'
import UserProfile from "./user/profile/Profile";
import PrivateRoute from './auth/PrivateRoute'

import Foot from './core/Footer'


class MainRouter extends Component {

  render() {
		return (
			<div style={{backgroundImage: 'url(/assets/images/blue.jpg)', height: '900'}}>
				<Nav/>
				<div className="main-wrapper" style={{paddingTop: '7rem', paddingBottom: '4rem'}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={LogIn}/>
						<Route exact path="/students" component={Users} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/user/:userId" component={UserProfile} />
						<Route exact path="/course/:courseId" component={CourseHome} />
						<PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
					</Switch>
				</div>
				<Foot/>
			</div>
		);
	}
}

export default MainRouter;

