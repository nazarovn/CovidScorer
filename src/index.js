import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CovidMap from './containers/CovidMap';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import Contacts from "./pages/Contacts";


ReactDOM.render(
  <Router>
    <Switch>
      <Route path={"/contacts"} component={Contacts} />
      <Route path={"/company"} component={() => <CovidMap isCompany={true} />} />
      <Route path={"/"} exact component={() => <CovidMap isCompany={false} />} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
