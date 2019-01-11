import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Nav from './core/Nav';
import Home from "./core/Home";
import Foot from "./core/Footer"

import LogIn from "./user/Login.jsx";
import Register from "./user/Register.jsx";
import EditProfile from "./user/profile/EditProfile.jsx";
import CourseLessons from './courses/CourseLessons'

import EditCourse from './courses/dashboard/EditCourse'
import MyCourses from './courses/MyCourses'

import CourseHome from './courses/CourseHome'
import Users from './user/Users.jsx'
import UserProfile from "./user/profile/Profile";
import PrivateRoute from './auth/PrivateRoute'

import "./styles/index.css";

class MainRouter extends Component {

  render() {
		return (
			<div className="innerroot">
				<Nav history={this.props}/>
				<div className="main-wrapper" style={{paddingTop: '2rem', marginTop: '2rem'}}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={LogIn}/>
						<Route exact path="/students" component={Users} />
						<Route exact path="/register/:role" component={Register} />
						<Route exact path="/courses" component={MyCourses} />
						<Route exact path="/users/:userId" component={UserProfile} />
						<PrivateRoute path="/users/edit/:userId" component={EditProfile}/>
						<Route exact path="/courses/edit/:courseId" component={EditCourse} />
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

