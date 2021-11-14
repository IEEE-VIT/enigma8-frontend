import React from "react";
import "./GoldenBtn.styles.css";

import PropTypes from "prop-types";

const GoldenBtn = (props) => {
  const { children, triggerFunction, width, marginTop } = props;
  const handleClick = () => {
    triggerFunction();
  };
  return (
    <div>
      <button
        type="submit"
        style={{ width, marginTop }}
        onClick={handleClick}
        className="golden-btn"
      >
        {children}
      </button>
    </div>
  );
};
GoldenBtn.propTypes = {
  children: PropTypes.string.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  marginTop: PropTypes.string.isRequired,
};
export default GoldenBtn;
