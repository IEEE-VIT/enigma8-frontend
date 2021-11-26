import React from "react";
import PropTypes from "prop-types";
import BlueBtn from "../../CustomButton/Blue/BlueBtn.component";
import "./BlueNestedModal.styles.css";

const NestedModal = ({
  stateValue,
  PreMessage,
  ButtonText,
  triggerFunction,
  PostMessage,
  powerUp,
  imagePowerup,
  imagePowerupUrl,
}) => {
  const handleChange = () => {
    triggerFunction();
  };
  const Pre = () => (
    <div>
      <p style={{ color: "#0fa3b1" }}>{PreMessage}</p>
      <BlueBtn triggerFunction={handleChange} marginTop="0px" width="180px">
        {ButtonText}
      </BlueBtn>
    </div>
  );
  const Post = () => (
    <div>
      <p style={{ color: "#0FA3B1" }}>
        {PostMessage}
        {imagePowerup ? (
          <img
            src={imagePowerupUrl}
            style={{ width: "500px", marginTop: "12px" }}
            alt=""
          />
        ) : (
          ` ${powerUp}`
        )}
      </p>
    </div>
  );
  return stateValue ? Post() : Pre();
};
NestedModal.defaultProps = {
  powerUp: "",
  imagePowerup: "",
  imagePowerupUrl: "",
};

NestedModal.propTypes = {
  stateValue: PropTypes.bool.isRequired,
  PreMessage: PropTypes.string.isRequired,
  ButtonText: PropTypes.string.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  PostMessage: PropTypes.elementType.isRequired,
  powerUp: PropTypes.string,
  imagePowerup: PropTypes.bool,
  imagePowerupUrl: PropTypes.string,
};

export default NestedModal;
