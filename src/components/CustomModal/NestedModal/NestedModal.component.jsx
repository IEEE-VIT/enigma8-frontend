import React from "react";
import PropTypes from "prop-types";
import OutlineGoldenBtn from "../../CustomButton/OutlineGolden/OutlineGoldenBtn.component";
import "./NestedModal.styles.css";

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
      <p>{PreMessage}</p>
      <OutlineGoldenBtn
        triggerFunction={handleChange}
        marginTop="0px"
        width="180px"
      >
        {ButtonText}
      </OutlineGoldenBtn>
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
