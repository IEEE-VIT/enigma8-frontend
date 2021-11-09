import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "./ModalContainer.styles.css";

const ModalContainer = ({ innerText, openText }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <button onClick={handleOpen} type="button">
        {openText}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
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
  openText: PropTypes.string.isRequired,
};
export default ModalContainer;
