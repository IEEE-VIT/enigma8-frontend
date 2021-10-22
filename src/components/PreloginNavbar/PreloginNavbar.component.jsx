import React from "react";
import "./PreloginNavbar.styles.css";
import { Link } from "react-router-dom";

const PreloginNavbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>Enigma 8</h1>
      </Link>
      <ul>
        <li>
          <a href="./#home">Home</a>
        </li>
        <li>
          <a href="./#sponsors">Sponsors</a>
        </li>
        <li>
          <a href="./#login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default PreloginNavbar;
