import React, { useState } from "react";
import "./PostloginNavbar.styles.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import ProfileMenu from "../Menu/ProfileMenu/ProfileMenu.component";
import Instructions from "../Instructions/Instructions.component";
import InstructionsLogo from "../../assets/navbar/Instructions.svg";
import EnigmaFont from "../../assets/Enigma-font.svg";

const PostloginNavbar = () => {
  const useStyles = makeStyles(() => ({
    nav: {
      backgroundColor: "black",
      height: "69px",
      backgroundPosition: "center",
      color: "#d08123",
      padding: "12px 32px",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      verticalAlign: "middle",
      boxShadow: "inset 0px -1px 0px #ffd37c",
    },
    enigma: {
      fontSize: "2rem",
      fontWeight: "700",
      fontFamily: "Cinzel Decorative",
    },
  }));
  const [openInstructions, setOpenInstructions] = useState(false);
  const handleClose = () => {
    setOpenInstructions(false);
  };
  const handleOpen = () => {
    setOpenInstructions(true);
  };
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <div className={classes.enigma}>
        <Link to="/rooms">
          <img
            src={EnigmaFont}
            alt=""
            className="enigma-nav-logo cursor-pointer"
          />
        </Link>
      </div>
      <div className="postlogin-nav">
        <Link to="/rooms">
          <div className="postlogin-nav-item postlogin-nav-item-text cursor-pointer">
            Rooms
          </div>
        </Link>
        <Link to="/story">
          <div className="postlogin-nav-item postlogin-nav-item-text cursor-pointer">
            Story
          </div>
        </Link>
        <div>
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
            className="pointer-cursor"
            style={{
              background: "none",
              border: "none",
              margin: "0",
              padding: "0",
            }}
            onClick={handleOpen}
          >
            <img
              src={InstructionsLogo}
              alt=""
              className="postlogin-nav-item postlogin-nav-item-instructions cursor-pointer"
            />
          </button>
        </div>
        <Link to="/leaderboard">
          <div className="postlogin-nav-item postlogin-nav-item-text cursor-pointer">
            Leaderboard
          </div>
        </Link>
        <ProfileMenu />
        {/* <NotificationsIcon className="postlogin-nav-item" /> */}
      </div>
    </nav>
  );
};

export default PostloginNavbar;
