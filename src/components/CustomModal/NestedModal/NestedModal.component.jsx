import React from "react";
import PropTypes from "prop-types";
import "./NestedModal.styles.css";

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
      <p>{PreMessage}</p>
      <button type="button" onClick={handleChange}>
        {ButtonText}
      </button>
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
