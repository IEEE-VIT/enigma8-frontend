import React from "react";
import "./PostloginNavbar.styles.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ProfileMenu from "../Menu/ProfileMenu/ProfileMenu.component";

const PostloginNavbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to="/">
        <h1>Enigma 8</h1>
      </Link>
      <ul>
        <li>
          <Link to="/rooms">Rooms</Link>
        </li>
        <li>
          <Link to="/story">Story</Link>
        </li>
        <li>Instructions</li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          <ProfileMenu />
        </li>
        <li>
          <NotificationsIcon />
        </li>
      </ul>
    </nav>
  );
};

export default PostloginNavbar;
