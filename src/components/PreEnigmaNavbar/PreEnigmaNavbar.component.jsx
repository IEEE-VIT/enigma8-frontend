import React from "react";
import "./PreEnigmaNavbar.styles.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

const PreloginNavbar = () => {
  const cookies = new Cookies();
  const logout = () => {
    cookies.remove("token");
    cookies.remove("newUser");
    window.location.reload();
  };
  return (
    <nav>
      <Link to="/">
        <h1>Enigma 8</h1>
      </Link>
      <ul>
        <button
          type="button"
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={logout}
        >
          Logout
        </button>
      </ul>
    </nav>
  );
};

export default PreloginNavbar;
