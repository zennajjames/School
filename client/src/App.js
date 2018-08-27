import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from "./pages/Login";
import Home from "./pages/Home";
import LogoutFunction from './pages/LogoutFunction';
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Auth from './modules/Auth';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
);

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
);

class App extends Component {

    state = {
      authenticated: false,
      loggedIn: false,
      username: null
    }
  

  updateUser (userObject) {
    this.setState(userObject)
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  };

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
              <div className="top-bar">
                <div className="top-bar-left">
                  <Link to="/">School</Link>
                </div>
                {this.state.authenticated ? (
                  <div className="top-bar-right">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/logout">Log out</Link>
                  </div>
                ) : (
                  <div className="top-bar-right">
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                  </div>
                )}
              </div>

              <PropsRoute exact path="/" component={Home} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <PrivateRoute path="/dashboard" component={Dashboard}/>
              <LoggedOutRoute path="/login" component={Login} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <LoggedOutRoute path="/signup" component={SignUp}/>
              <Route path="/logout" component={LogoutFunction}/>
              </div>

        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;


// const App = () => (
//   <Router>
//     <div>
//       <Nav />
//       <Switch>
//         <Route exact path="/" component={Users} />
//         <Route exact path="/users" component={Users} />
//         <Route exact path="/users/:id" component={Detail} />
//         <Route component={NoMatch} />
//       </Switch>
//     </div>
//   </Router>
// );

/* <PrivateRoute path="/dashboard" component={Dashboard}/>
<Route path="/logout" component={LogoutFunction}/> */

// export default App;
