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
import LicenseVerification from './LicenseVerification';

const App = () => (
  <Router>
    <Switch>
      <Route path="/new-license" component={NewLicense}/>
      <Route path="/verification" component={Verification} />
      <Route path="/license-verification" component={LicenseVerification} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
);

export default App;