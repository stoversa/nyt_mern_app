import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./components/Main"
import Nav from "./components/Nav"


const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </div>
  </Router>
);

export default App;
