import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/Home/HomePage";
import LeaderBoardPage from "./pages/LeaderBoard/LeaderBoard";
import LoginPage from "./pages/Login/Login";
import ProfilePage from "./pages/Profile/Profilepage";

import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/leaderboard" component={LeaderBoardPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
