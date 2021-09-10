import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Home/HomePage.component";
import LeaderBoardPage from "./pages/LeaderBoard/LeaderBoard.component";
import LoginPage from "./pages/Login/LoginPage.component";
import ProfilePage from "./pages/Profile/ProfilePage.component";

import Navbar from "./components/navbar/Navbar.component";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/leaderboard" component={LeaderBoardPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
