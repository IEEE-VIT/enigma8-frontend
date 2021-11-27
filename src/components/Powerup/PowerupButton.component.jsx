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
  return (
    <button
      type="button"
      className={
        !availableToUse
          ? "powerup-item-container cursor-disabled"
          : "powerup-item-container cursor-pointer"
      }
      style={{
        width: "100%",
        marginTop: 10,
        backgroundColor: `${bgColour}`,
        border: "none",
        opacity: !availableToUse ? 0.7 : "none",
      }}
      id={_id}
      onClick={selectPowerup}
      disabled={!availableToUse}
    >
      {" "}
      {availableToUse ? (
        <div className="powerup-item cursor-pointer">
          <img src={icon} className="powerup-item-icon cursor-pointer" alt="" />
          <div className="powerup-item-heading cursor-pointer">{name}</div>
          <div className="powerup-item-text cursor-pointer">{detail}</div>
        </div>
      ) : (
        <div className="powerup-item cursor-disabled">
          <img
            src={icon}
            className="powerup-item-icon cursor-disabled"
            alt=""
          />
          <div className="powerup-item-heading cursor-disabled">{name}</div>
          <div className="powerup-item-text cursor-disabled">{detail}</div>
        </div>
      )}
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
