import React from "react";
import PropTypes from "prop-types";

const LinkImage = ({ link, img, linkClass, imgClass }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className={linkClass}>
      <img src={img} alt="" className={imgClass} />
    </a>
  );
};

LinkImage.propTypes = {
  link: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  linkClass: PropTypes.string,
  imgClass: PropTypes.string,
};
LinkImage.defaultProps = {
  linkClass: "",
  imgClass: "",
};

export default LinkImage;
