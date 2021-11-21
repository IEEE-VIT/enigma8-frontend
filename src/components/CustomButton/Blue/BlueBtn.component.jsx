import React from "react";
import "./BlueBtn.styles.css";

import PropTypes from "prop-types";

const BlueBtn = (props) => {
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
        className="blue-btn"
      >
        {children}
      </button>
    </div>
  );
};
BlueBtn.propTypes = {
  children: PropTypes.string.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  marginTop: PropTypes.string.isRequired,
};
export default BlueBtn;
