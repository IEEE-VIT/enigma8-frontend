import React from "react";
import PropTypes from "prop-types";

const PowerupButton = ({
  powerup,
  selectPowerupButton,
  selectPowerupID,
  bgColour,
}) => {
  const { _id, icon, name, detail, availableToUse } = powerup;
  const selectPowerup = () => {
    if (selectPowerupID !== _id) {
      selectPowerupButton(_id);
    }
  };
  console.log(icon, name, detail, availableToUse);
  return (
    <button
      type="button"
      className="powerup-item-container"
      style={{
        width: "100%",
        marginTop: 10,
        backgroundColor: `${bgColour}`,
        border: "none",
        opacity: !availableToUse ? 0.7 : "none",
        cursor: !availableToUse ? "not-allowed" : "pointer",
      }}
      id={_id}
      onClick={selectPowerup}
      disabled={!availableToUse}
    >
      <div className="powerup-item">
        <img src={icon} className="powerup-item-icon" alt="" />
        <div className="powerup-item-heading">{name}</div>
        <div className="powerup-item-text">{detail}</div>
      </div>
    </button>
  );
};

PowerupButton.propTypes = {
  powerup: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    availableToUse: PropTypes.bool.isRequired,
  }).isRequired,
  selectPowerupButton: PropTypes.func.isRequired,
  selectPowerupID: PropTypes.string.isRequired,
  bgColour: PropTypes.string.isRequired,
};

export default PowerupButton;
