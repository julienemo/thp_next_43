import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Provider } from "react-redux";
import './Styles/index.scss';
import App from "./App";
import Store from "./Redux/Store";
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={Store}>
    <Router history={customHistory}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
