import React from "react";
import "./SideNavbar.styles.css";

import LinkImage from "../LinkImage/LinkImage.component";

import YouTubeIcon from "../../assets/home/youtube.svg";
import FacebookIcon from "../../assets/home/facebook.svg";
import LinkedInIcon from "../../assets/home/linkedin.svg";
import GitHubIcon from "../../assets/home/github.svg";
import InstagramIcon from "../../assets/home/instagram.svg";
import TwitterIcon from "../../assets/home/twitter.svg";

const facebookLink = "https://www.facebook.com/IEEEVIT/";
const instagramLink = "https://www.instagram.com/ieeevitvellore/?hl=en";
const githubLink = "https://github.com/IEEE-VIT";
const twitterLink = "https://twitter.com/ieeevitvellore";
const linkedinLink = "https://in.linkedin.com/company/ieee-vit-vellore";
const youtubeLink = "https://www.youtube.com/c/IEEEVITVellore";

const SideNavbar = () => {
  return (
    <div className="navbar-social-container">
      <div className="navbar-social">
        <LinkImage
          link={linkedinLink}
          img={LinkedInIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
        <LinkImage
          link={twitterLink}
          img={TwitterIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
        <LinkImage
          link={facebookLink}
          img={FacebookIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
        <LinkImage
          link={instagramLink}
          img={InstagramIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
        <LinkImage
          link={githubLink}
          img={GitHubIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
        <LinkImage
          link={youtubeLink}
          img={YouTubeIcon}
          linkClass="footer-social-link"
          imgClass="sidenavbar-icon cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SideNavbar;
