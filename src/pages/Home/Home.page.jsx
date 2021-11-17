import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "./Home.styles.css";

import LandingPageNavbar from "../../components/LandingPageNavbar/LandingPageNavbar.component";
import LoginPortal from "../../components/LoginPortal/LoginPortal.component";

import SideNavbar from "../../components/SideNavbar/SideNavbar.component";

import EnimgaBrand from "../../assets/home/Enigma_brand.svg";
import Desert from "../../assets/home/desert.svg";

const HomePage = () => {
  const [stars, setStars] = useState(``);
  const [meteors, setMeteors] = useState(``);

  const NightSky = () => {
    // stars
    const style = ["style1", "style2", "style3", "style4"];
    const tam = ["tam1", "tam1", "tam1", "tam2", "tam3"];
    const opacity = [
      "opacity1",
      "opacity1",
      "opacity1",
      "opacity2",
      "opacity2",
      "opacity3",
    ];

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let star = "";
    const totalStars = 250;
    // const night = document.querySelector(".stars");
    const widthWindow = window.innerWidth;
    const heightWindow = window.innerHeight;

    for (let i = 0; i < totalStars; i += 1) {
      star += `<span class='star ${style[getRandomArbitrary(0, 4)]} ${
        opacity[getRandomArbitrary(0, 6)]
      } ${
        tam[getRandomArbitrary(0, 5)]
      } ' style='animation-delay: .${getRandomArbitrary(
        0,
        9
      )}s; left: ${getRandomArbitrary(
        0,
        widthWindow
      )}px; top: ${getRandomArbitrary(0, heightWindow)}px;'></span>`;
    }
    setStars(star);

    // meteor

    let speed = 5000;

    setTimeout(() => {
      getMeteor();
    }, speed);

    function getMeteor() {
      setTimeout(getMeteor, speed);
      speed = getRandomArbitrary(5000, 10000);
      const meteor = `<div class='meteor ${
        style[getRandomArbitrary(0, 4)]
      }'></div>`;
      setMeteors(meteor);
      setTimeout(() => {
        setMeteors("");
      }, 1000);
    }
  };
  useEffect(() => {
    NightSky();
  }, []);
  return (
    <div className="home">
      <LandingPageNavbar />
      <div className="home-text">
        <div>
          <img className="home-brand" src={EnimgaBrand} alt="" />
        </div>
        <LoginPortal />
        <SideNavbar />
      </div>

      <img className="home-desert" src={Desert} alt="" />
      <div className="home-background">
        <div className="night"> </div>
        <div className="stars">{parse(stars)}</div>

        <div className="meteors">{parse(meteors)}</div>
      </div>
    </div>
  );
};

export default HomePage;
