import React from "react";
import "./PostloginNavbar.styles.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";

const PostloginNavbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>Enigma 8</h1>
      </Link>
      <ul>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>Instructions</li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <NotificationsIcon />
        </li>
      </ul>
    </nav>
  );
};

export default PostloginNavbar;