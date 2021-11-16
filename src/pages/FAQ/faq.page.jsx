import React from "react";
import "./faq.styles.css";

import FAQBox from "../../components/FAQBox/FAQBox.component";
import FooterNav from "../../components/FooterNav/FooterNav.component";

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
            link_class=""
            img_class="faq-discord-logo"
          />
        </div>
      </div>
      <FooterNav />
    </div>
  );
};

export default FAQ;
