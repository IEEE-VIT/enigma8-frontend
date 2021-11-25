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
