import React, { useState, useEffect } from "react";
import "./PreloginNavbar.styles.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavMenu from "../Menu/NavMenu/NavMenu.component";
import EnigmaFont from "../../assets/Enigma-font.svg";

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
  const [, setWindowWidth] = useState(0);
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
  const classes = useStyles();
  const ExtendedNav = () => (
    <div className="prelogin-nav-extended">
      <Link to="/">
        <div className="prelogin-nav-item cursor-pointer">Home</div>
      </Link>
      <Link to="/sponsors">
        <div className="prelogin-nav-item cursor-pointer">Sponsors</div>
      </Link>
      <Link to="/faq">
        <div className="prelogin-nav-item cursor-pointer">FAQs</div>
      </Link>
    </div>
  );
  return (
    <nav className={classes.nav}>
      <div className={classes.enigma}>
        <Link to="/">
          <img
            src={EnigmaFont}
            alt=""
            className="enigma-nav-logo cursor-pointer"
          />
        </Link>
      </div>
      <div className="prelogin-nav">
        {showMenu ? <NavMenu /> : <ExtendedNav />}
      </div>
    </nav>
  );
};

export default PreloginNavbar;
