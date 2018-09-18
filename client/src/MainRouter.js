import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'


import Nav from './core/Nav';
import Home from "./core/Home";

import LogIn from "./user/Login.jsx";
import Register from "./user/Register.jsx";
import EditProfile from "./user/profile/EditProfile.jsx";
import Foot from "./core/Footer"
import CourseDashboard from './courses/dashboard/CourseDashboard'
import CourseLessons from './courses/CourseLessons'

import CourseHome from './courses/CourseHome'
import Users from './user/Users.jsx'
import UserProfile from "./user/profile/Profile";
import PrivateRoute from './auth/PrivateRoute'


class MainRouter extends Component {

  render() {
		return (
			<div>
				<Nav history={this.props}/>
				<div className="main-wrapper" style={{paddingTop: '6rem', paddingBottom: '5rem', marginBottom: '5rem'}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={LogIn}/>
						<Route exact path="/students" component={Users} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/users/:userId" component={UserProfile} />
						<PrivateRoute path="/users/edit/:userId" component={EditProfile}/>
						<Route exact path="/courses/edit/:courseId" component={CourseDashboard} />
						<Route exact path="/courses/:courseId" component={CourseHome} />
						<Route exact path="/courses/lessons/:courseId" component={CourseLessons} />
					</Switch>
				<Foot/>
				</div>
			</div>
		);
	}
}

export default MainRouter;

// style={{paddingTop: '2rem', marginTop: '0rem'}}