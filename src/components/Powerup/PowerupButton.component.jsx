import React from "react";
import PropTypes from "prop-types";

const PowerupButton = ({
  powerup,
  selectPowerupButton,
  selectPowerupID,
  bgColour,
}) => {
  const { _id, icon, name, detail } = powerup;
  const selectPowerup = () => {
    if (selectPowerupID !== _id) {
      selectPowerupButton(_id);
    }
  };
  return (
    <button
      type="button"
      className="powerup-modal-button"
      style={{
        width: "100%",
        marginTop: 10,
        backgroundColor: `${bgColour}`,
        border: "none",
      }}
      id={_id}
      onClick={selectPowerup}
    >
      <div className="powerup-modal-description-container-row">
        <div className="powerup-modal-description-container-image">
          <img src={icon} alt="Powerup" />
        </div>
        <div className="powerup-modal-description-container-text">
          <div className="powerup-modal-description-container-text-title">
            <h3>{name}</h3>
          </div>
          <div className="powerup-modal-description-container-text-description">
            <p>{detail}</p>
          </div>
        </div>
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
    available_to_use: PropTypes.bool.isRequired,
  }).isRequired,
  selectPowerupButton: PropTypes.func.isRequired,
  selectPowerupID: PropTypes.string.isRequired,
  bgColour: PropTypes.string.isRequired,
};

export default PowerupButton;
