import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "./Home.styles.css";
import Desert from "../../assets/home/desert.svg";
import LoginPortal from "../../components/LoginPortal/LoginPortal.component";
import LinkImage from "../../components/LinkImage/LinkImage.component";

import FacebookIcon from "../../assets/home/facebook.svg";
import LinkedInIcon from "../../assets/home/linkedin.svg";
import GitHubIcon from "../../assets/home/github.svg";
import InstagramIcon from "../../assets/home/instagram.svg";
import TwitterIcon from "../../assets/home/twitter.svg";
import EnimgaBrand from "../../assets/home/Enigma_brand.svg";

const facebookLink = "https://www.facebook.com/IEEEVIT/";
const instagramLink = "https://www.instagram.com/ieeevitvellore/?hl=en";
const githubLink = "https://github.com/IEEE-VIT";
const twitterLink = "https://twitter.com/ieeevitvellore";
const linkedinLink = "https://in.linkedin.com/company/ieee-vit-vellore";

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
      <div className="home-text">
        <div>
          <img className="home-brand" src={EnimgaBrand} alt="" />
        </div>
        <LoginPortal />
        <div className="navbar-social-container">
          <div className="navbar-social">
            <LinkImage
              link={linkedinLink}
              img={LinkedInIcon}
              link_class="footer-social-link"
              img_class="footer-social-icon"
            />
            <LinkImage
              link={twitterLink}
              img={TwitterIcon}
              link_class="footer-social-link"
              img_class="footer-social-icon"
            />
            <LinkImage
              link={facebookLink}
              img={FacebookIcon}
              link_class="footer-social-link"
              img_class="footer-social-icon"
            />
            <LinkImage
              link={instagramLink}
              img={InstagramIcon}
              link_class="footer-social-link"
              img_class="footer-social-icon"
            />
            <LinkImage
              link={githubLink}
              img={GitHubIcon}
              link_class="footer-social-link"
              img_class="footer-social-icon"
            />
          </div>
        </div>
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
