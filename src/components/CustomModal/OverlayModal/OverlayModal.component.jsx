import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "./OverlayModal.styles.css";

const ModalContainer = ({ innerText }) => {
  const [open] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      {/* <button onClick={handleOpen} type="button">
        {openText}
      </button> */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box">
          {/* Add Close Button */}
          <Box sx={style}>{innerText}</Box>
        </div>
      </Modal>
    </div>
  );
};
ModalContainer.propTypes = {
  innerText: PropTypes.element.isRequired,
};
export default ModalContainer;
