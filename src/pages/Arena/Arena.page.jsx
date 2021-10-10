import React from "react";
import { Switch } from "react-router-dom";
import "./Arena.styles.css";

import PostloginNavbar from "../../components/PostloginNavbar/PostloginNavbar.component";
import Rooms from "../../components/Rooms/Rooms.page";
import Leaderboard from "../../components/Leaderboard/Leaderboard.page";
import Profile from "../../components/Profile/Profile.component";

import Instructions from "../../components/Instructions/Instructions.page";
import Question from "../../components/Question/Question.page";

import ProtectedRoute from "../../components/ProtectedRoute.component";
// import NotFound from "../NotFound.page";
const Arena = () => {
  return (
    <div>
      <PostloginNavbar />
      Arena
      <div>Placeholder: should display Rooms by default</div>
      <Switch>
        {/* BUG: These routes is not working as expected. Displays an empty page, even though route changes correctly in URL. Similar case: login.page welcome route */}
        {/* Tried with both ProtectedRoute and Route */}
        <ProtectedRoute redirect="/" exact path="/rooms" component={Rooms} />

        <ProtectedRoute
          redirect="/"
          exact
          path="/instructions"
          component={Instructions}
        />
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
        <ProtectedRoute
          redirect="/"
          exact
          path="/question"
          component={Question}
        />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
};

export default Arena;
