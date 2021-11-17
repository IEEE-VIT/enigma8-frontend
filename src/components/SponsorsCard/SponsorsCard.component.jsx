import React from "react";
import "./SponsorsCard.styles.css";
import PropTypes from "prop-types";

import DividerBar from "../../assets/home/sponsor-bar.svg";
import LinkImage from "../LinkImage/LinkImage.component";

const SponsorsCard = ({ img, title, link, type }) => {
  return (
    <div className="sponsorcard">
      <div className={`sponsorcard-title sponsorcard-title-${type}`}>
        {title}
      </div>
      <img
        src={DividerBar}
        className={`sponsorcard-divider sponsorcard-divider-${type}`}
        alt=""
      />
      <div className={`sponsorcard-paper sponsorcard-paper-${type}`}>
        <LinkImage
          link={link}
          img={img}
          linkClass=""
          imgClass={`sponsorcard-img sponsorcard-img-${type}`}
        />
      </div>
    </div>
  );
};

SponsorsCard.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.number,
};
SponsorsCard.defaultProps = {
  img: "",
  title: "",
  link: "",
  type: "",
};
export default SponsorsCard;
