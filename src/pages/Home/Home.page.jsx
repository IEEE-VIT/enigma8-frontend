import React from "react";

import "./Home.styles.css";

import LoginPortal from "../../components/LoginPortal/LoginPortal.component";

const HomePage = () => {
  return (
    <div>
      <div>Enigma 8 - Online cryptic hunt</div>
      <LoginPortal />
      <div>Sponsors</div>
      <div>Footer</div>
    </div>
  );
};

export default HomePage;
