import React, { useState } from "react";
import "./PostloginNavbar.styles.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ProfileMenu from "../Menu/ProfileMenu/ProfileMenu.component";
import Instructions from "../Instructions/Instructions.component";

const PostloginNavbar = () => {
  const [openInstructions, setOpenInstructions] = useState(false);
  const handleClose = () => {
    setOpenInstructions(false);
  };
  const handleOpen = () => {
    setOpenInstructions(true);
  };
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
        {/* <li>Instructions</li> */}
        {openInstructions ? (
          <Instructions
            handleClose={handleClose}
            openInstructions={openInstructions}
          />
        ) : (
          <> </>
        )}

        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            margin: "0",
            padding: "0",
          }}
          onClick={handleOpen}
        >
          Instructions
        </button>
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
