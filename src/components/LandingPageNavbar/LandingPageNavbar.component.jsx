import React from "react";
import "./LandingPageNavbar.styles.css";
import { Link } from "react-router-dom";

const LandingPageNavbar = () => {
  return (
    <nav className="landingpage-nav-container">
      <div className="landingpage-nav">
        <Link to="/">
          <div className="landingpage-nav-item">Home</div>
        </Link>
        <Link to="/sponsors">
          <div className="landingpage-nav-item">Sponsors</div>
        </Link>
        <Link to="/faq">
          <div className="landingpage-nav-item">FAQs</div>
        </Link>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
