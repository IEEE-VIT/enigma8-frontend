import React from "react";
import "./PreEnigmaNavbar.styles.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { makeStyles } from "@material-ui/core";
import logoutIcon from "../../assets/logout.svg";

const useStyles = makeStyles(() => ({
  nav: {
    backgroundColor: "black",
    height: "69px",
    color: "white",
    backgroundPosition: "center",
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    padding: "12px 32px",
    display: "flex",
    alignItems: "center",
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

const PreEnigmaNavbar = () => {
  const classes = useStyles();
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("newUser");
    window.location.reload();
  };
  return (
    <nav className={classes.nav}>
      <div className={classes.enigma}>
        <Link to="/">ENIGMA</Link>
      </div>
      <div
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: "22px",
          display: "flex",
          verticalAlign: "center",
          alignItems: "center",
        }}
        onClick={logout}
        onKeyDown={logout}
        role="button"
        tabIndex={0}
      >
        <img style={{ height: 29.33 }} src={logoutIcon} alt="" /> Logout
      </div>
    </nav>
  );
};

export default PreEnigmaNavbar;
