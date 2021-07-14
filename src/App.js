import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Home';
import Verification from './Verification';
import NewLicense from './NewLicense';


const App = () => (
  <Router>
    <Switch>
      <Route path="/new-license" component={NewLicense}/>
      <Route path="/verification" component={Verification} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;