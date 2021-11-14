import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  timercardButtonLarge: {
    backgroundColor: "#121212",
    backgroundPosition: "center",
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    borderRadius: "3.99133px",
    boxShadow: "2.3948px 1.59653px 0.798265px #0FA3B1",
    boxSizing: "border-box",
    border: "1px solid #0FA3B1",
    width: "68.65px",
    height: "67px",
    marginRight: "15px",
    fontSize: "24px",
    fontFamily: "Cinzel",
    "& h3": {
      margin: "0",
      fontWeight: "bold",
    },
    [theme.breakpoints.down("md")]: {
      width: "45px",
      height: "45px",
      fontSize: "24px",
      marginRight: "8px",
    },
  },
  timercardButtonSmall: {
    backgroundColor: "#121212",
    backgroundPosition: "center",
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    borderRadius: "3.99133px",
    boxShadow: "2.3948px 1.59653px 0.798265px #0FA3B1",
    boxSizing: "border-box",
    border: "1px solid #0FA3B1",
    width: "68.65px",
  },
}));

const TimerCard = (props) => {
  const { size, number } = props;
  const classes = useStyles(size);
  return (
    <button
      type="button"
      className={
        size === "large"
          ? `${classes.timercardButtonLarge}`
          : `${classes.timercardButtonSmall}`
      }
    >
      <div className="card-header">
        <h3>{number}</h3>
      </div>
    </button>
  );
};

export default TimerCard;

TimerCard.propTypes = {
  size: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
