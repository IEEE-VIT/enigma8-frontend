import React, { useState, useEffect } from "react";
import "./PreloginNavbar.styles.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import HamMenu from "../Menu/menu.component";

const useStyles = makeStyles(() => ({
  nav: {
    backgroundColor: "black",
    height: "69px",
    // color: "white",
    backgroundPosition: "center",
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
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

const PreloginNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = (width) => {
    if (width < 500) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setShowMenu(isMobile(window.innerWidth));
    window.addEventListener("resize", (x) => {
      setWindowWidth(x.currentTarget.innerWidth);
      setShowMenu(isMobile(x.currentTarget.innerWidth));
    });
  }, []);
  console.log(windowWidth);
  const classes = useStyles();
  const ExtendedNav = () => (
    <div className="prelogin-nav-extended">
      <Link to="/">
        <div className="prelogin-nav-item">Home</div>
      </Link>
      <Link to="/sponsors">
        <div className="prelogin-nav-item">Sponsors</div>
      </Link>
      <Link to="/faq">
        <div className="prelogin-nav-item">FAQs</div>
      </Link>
    </div>
  );
  return (
    <nav className={classes.nav}>
      <div className={classes.enigma}>
        <Link to="/">ENIGMA</Link>
      </div>
      <div className="prelogin-nav">
        {showMenu ? <HamMenu /> : <ExtendedNav />}
      </div>
    </nav>
  );
};

export default PreloginNavbar;
