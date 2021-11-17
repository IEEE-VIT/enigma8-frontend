import React from "react";
import "./faq.styles.css";

import FAQBox from "../../components/FAQBox/FAQBox.component";
import FooterNav from "../../components/FooterNav/FooterNav.component";

import BackgroundLeft from "../../assets/home/bg-left.svg";
import BackgroundRight from "../../assets/home/bg-right.svg";

import DiscordLogo from "../../assets/home/Discord-Logo.svg";
import LinkImage from "../../components/LinkImage/LinkImage.component";

import FAQSList from "../../assets/faqs/faqslist";

const discordLink = "https://discord.gg/HUH9nzespc";

const FAQ = () => {
  const FAQItems = FAQSList.map((set, index) => (
    <FAQBox question={set.question} answer={set.answer} index={index} />
  ));
  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1 className="faq-heading">FAQs</h1>
        <div className="faq-box-container">{FAQItems}</div>
        <div className="faq-discord-container">
          <div className="faq-discord-text">
            Can’t find your question? Join our Discord Server!
          </div>
          <LinkImage
            link={discordLink}
            img={DiscordLogo}
            linkClass=""
            imgClass="faq-discord-logo"
          />
        </div>
      </div>
      <img src={BackgroundLeft} className="home-bg-left" alt="" />
      <img src={BackgroundRight} className="home-bg-right" alt="" />

      <FooterNav />
    </div>
  );
};

export default FAQ;
