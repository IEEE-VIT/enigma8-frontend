import React from "react";

import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <div>Woohoo! you have Successfully signed in</div>
      <div>Enter username</div>
      <Link to="/countdown">
        <button type="submit">Get Started</button>
      </Link>
    </div>
  );
};

export default Welcome;
