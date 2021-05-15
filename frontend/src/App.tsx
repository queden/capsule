import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import Home from './Home'
import Me from './Me'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/me">
          <Me />
        </Route>
     </Switch>
    </Router>
  );
}

export default App;
