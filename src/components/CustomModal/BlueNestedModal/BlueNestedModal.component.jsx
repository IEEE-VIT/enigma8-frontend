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
      <p>{PostMessage}</p>
    </div>
  );
  return stateValue ? Post() : Pre();
};

NestedModal.propTypes = {
  stateValue: PropTypes.bool.isRequired,
  PreMessage: PropTypes.string.isRequired,
  ButtonText: PropTypes.string.isRequired,
  triggerFunction: PropTypes.func.isRequired,
  PostMessage: PropTypes.elementType.isRequired,
};

export default NestedModal;
