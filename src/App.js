import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Navbar from "./Components/Navbar"
import AlertFlash from "./Components/AlertFlash"
import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import SignInPage from "./Pages/SignInPage"
import ErrorPage from "./Pages/ErrorPage"

import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <AlertFlash />
      <Switch>
        <PublicRoute exact path="/sign_in" component={SignInPage} />
        <PublicRoute exact path="/sign_up" component={SignUpPage} />
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
