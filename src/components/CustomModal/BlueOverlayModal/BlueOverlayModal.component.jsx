import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "./BlueOverlayModal.styles.css";

const ModalContainer = ({ innerText, header }) => {
  const [open] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "#121212",
    border: "2.5px solid transparent",
    borderImage: "linear-gradient(to right, #0FA3B1, #037EC3)",
    borderImageSlice: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Mulish",
    boxShadow: 24,
    p: 4,
    "@media screen and (max-width: 786px)": {
      width: "70%",
    },
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box">
          <Box sx={style}>
            <div
              className="box-modal"
              style={{
                color: "#0FA3B1",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="box-modal-header"
                style={{
                  color: "#0FA3B1",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontFamily: "Mulish",
                  fontSize: "1.5rem",
                }}
              >
                {header}
              </div>
              <div
                className="box-modal-innertext"
                style={{
                  color: "#0FA3B1",
                  textAlign: "center",
                  fontFamily: "Mulish",
                  fontSize: "1.5rem",
                  marginTop: "36.37px",
                }}
              >
                {innerText}
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
};
ModalContainer.propTypes = {
  innerText: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};
export default ModalContainer;
