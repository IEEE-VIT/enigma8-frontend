import React from "react";
import "./FooterNav.styles.css";

import LinkImage from "../LinkImage/LinkImage.component";

import FacebookIcon from "../../assets/home/facebook.svg";
import LinkedInIcon from "../../assets/home/linkedin.svg";
import GitHubIcon from "../../assets/home/github.svg";
import InstagramIcon from "../../assets/home/instagram.svg";
import TwitterIcon from "../../assets/home/twitter.svg";
import YouTubeIcon from "../../assets/home/youtube.svg";

const facebookLink = "https://www.facebook.com/IEEEVIT/";
const instagramLink = "https://www.instagram.com/ieeevitvellore/?hl=en";
const githubLink = "https://github.com/IEEE-VIT";
const twitterLink = "https://twitter.com/ieeevitvellore";
const linkedinLink = "https://in.linkedin.com/company/ieee-vit-vellore";
const youtubeLink = "https://www.youtube.com/c/IEEEVITVellore";

const FooterNav = () => {
  return (
    <div className="footer-navbar-container">
      <div className="footer-navbar">
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
        <LinkImage
          link={youtubeLink}
          img={YouTubeIcon}
          link_class="footer-social-link"
          img_class="footer-social-icon"
        />
      </div>
    </div>
  );
};

export default FooterNav;
