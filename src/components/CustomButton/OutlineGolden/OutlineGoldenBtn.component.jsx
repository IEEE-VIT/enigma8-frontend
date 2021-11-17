import React from "react";
import { makeStyles } from "@material-ui/core";
import "./OutlineGoldenBtn.styles.css";

import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  OutlineGoldenBtn: {
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

const OutlineGoldenBtn = (props) => {
  const classes = useStyles();
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
        className={`outline-golden-btn ${classes.OutlineGoldenBtn}`}
      >
        {children}
      </button>
    </div>
  );
};
OutlineGoldenBtn.propTypes = {
  children: PropTypes.string.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  marginTop: PropTypes.string.isRequired,
};
export default OutlineGoldenBtn;
