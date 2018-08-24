import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Home from './pages/Home';
import DynamicPage from './pages/DynamicPage';
import NoMatch from './pages/NoMatch';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/dynamic" component={DynamicPage} />          
          <Route exact path="/home" component={Home} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;