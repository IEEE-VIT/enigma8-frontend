import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <h1>Enigma 8</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/leaderboard">LeaderBoard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/leaderboard" component={LeaderBoardPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
function HomePage() {
  return <div>Home</div>;
}
function LeaderBoardPage() {
  return <div>LeaderBoard</div>;
}
function ProfilePage() {
  return <div>ProfilePage</div>;
}
function LoginPage() {
  return <div>LoginPage</div>;
}
export default App;
