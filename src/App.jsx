import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home.page";
import LoginPage from "./pages/Login/Login.page";
import Countdown from "./pages/Countdown/Countdown.page";
import Arena from "./pages/Arena/Arena.page";

import SuccessfulAuth from "./components/SuccessfulAuth.component";

// import NotFound from "./pages/NotFound/NotFound.page";
import ProtectedRoute from "./components/ProtectedRoute.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute
          redirect="/"
          exact
          path="/countdown"
          component={Countdown}
        />
        <ProtectedRoute redirect="/" exact path="/arena" component={Arena} />
        <Route exact path="/googlesuccessfulAuth" component={SuccessfulAuth} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;
