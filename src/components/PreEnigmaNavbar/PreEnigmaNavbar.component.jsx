import React from "react";
import "./PreEnigmaNavbar.styles.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import { makeStyles } from "@material-ui/core";
import logoutIcon from "../../assets/logout.svg";
import EnigmaFont from "../../assets/Enigma-font.svg";

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "black",
    height: "69px",
    backgroundPosition: "center",
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
    },
  },
  logout: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "24px",
    display: "flex",
    verticalAlign: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
    },
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
        <Link to="/">
          {" "}
          <img src={EnigmaFont} alt="" className="enigma-nav-logo" />
        </Link>
      </div>
      <div
        className={classes.logout}
        onClick={logout}
        onKeyDown={logout}
        role="button"
        tabIndex={0}
      >
        <img style={{ height: 25.33 }} src={logoutIcon} alt="" />
      </div>
    </nav>
  );
};

export default PreEnigmaNavbar;
