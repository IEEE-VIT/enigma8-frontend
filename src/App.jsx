import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute.component";
import TokenProtectedRoute from "./components/TokenProtectedRoute.component";

import Container from "./components/Container/Container.component";
import PreloginNavbar from "./components/PreloginNavbar/PreloginNavbar.component";
import PostloginNavbar from "./components/PostloginNavbar/PostloginNavbar.component";

import Home from "./pages/Home/Home.page";
import Countdown from "./pages/Countdown/Countdown.page";

import Welcome from "./pages/Welcome/Welcome.component";

import Rooms from "./pages/Rooms/Rooms.page";
import Leaderboard from "./pages/Leaderboard/Leaderboard.page";
import Profile from "./pages/Profile/Profile.component";
import Instructions from "./components/Instructions/Instructions.page";
import Question from "./pages/Question/Question.page";

import SuccessfulAuth from "./components/SuccessfulAuth.component";

import NotFound from "./pages/NotFound/NotFound.page";

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Container navbar={PreloginNavbar} page={Home} />}
        />
        <TokenProtectedRoute
          redirect="/"
          exact
          path="/welcome"
          component={() => (
            <Container navbar={PostloginNavbar} page={Welcome} />
          )}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/countdown"
          component={() => (
            <Container navbar={PreloginNavbar} page={Countdown} />
          )}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/rooms"
          component={() => <Container navbar={PostloginNavbar} page={Rooms} />}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/instructions"
          component={() => (
            <Container navbar={PostloginNavbar} page={Instructions} />
          )}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/leaderboard"
          component={() => (
            <Container navbar={PostloginNavbar} page={Leaderboard} />
          )}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/profile"
          component={() => (
            <Container navbar={PostloginNavbar} page={Profile} />
          )}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/question"
          component={() => (
            <Container navbar={PostloginNavbar} page={Question} />
          )}
        />
        <Route exact path="/googlesuccessfulAuth" component={SuccessfulAuth} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
