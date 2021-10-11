import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home/Home.page";
import Leaderboard from "./pages/Leaderboard/Leaderboard.page";
import Profile from "./pages/Profile/Profile.page";
import SuccessfulAuth from "./components/SuccessfulAuth.component";
import Rooms from "./pages/Rooms/Rooms.page";
import Question from "./pages/Question/Question.page";
import NotFound from "./pages/NotFound/NotFound.page";

import ProtectedRoute from "./components/ProtectedRoute.component";
import Navbar from "./components/Navbar/Navbar.component";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          redirect="/"
          exact
          path="/leaderboard"
          component={Leaderboard}
        />
        <ProtectedRoute
          redirect="/"
          exact
          path="/profile"
          component={Profile}
        />
        <Route exact path="/googlesuccessfulAuth" component={SuccessfulAuth} />

        <ProtectedRoute redirect="/" exact path="/rooms" component={Rooms} />
        <ProtectedRoute
          redirect="/"
          exact
          path="/question"
          component={Question}
        />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
