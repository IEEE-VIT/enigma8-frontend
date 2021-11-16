import React from "react";
import "./PreloginNavbar.styles.css";
// import { Link } from "react-router-dom";

const PreloginNavbar = () => {
  return (
    <nav className="prelogin-nav">
      <div className="prelogin-nav-inner">
        <span>
          <a href="./#home">Home</a>
        </span>
        <span>
          <a href="./#sponsors">Sponsors</a>
        </span>
        <span>
          <a href="./#login">FAQs</a>
        </span>
      </div>
    </nav>
  );
};

export default PreloginNavbar;
