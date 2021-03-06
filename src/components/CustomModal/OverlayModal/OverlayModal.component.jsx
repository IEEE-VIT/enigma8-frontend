import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "./OverlayModal.styles.css";

const ModalContainer = ({ innerText, header }) => {
  const [open] = useState(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#121212",
    border: "2.5px solid transparent",
    // borderImage: "linear-gradient(to right, #ffd37c, #D08123)",
    // borderImageSlice: 1,
    borderColor: "#D08123",
    borderRadius: "22px",
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
                // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                color: "#d08123",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="box-modal-header"
                style={{
                  // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
                  // WebkitBackgroundClip: "text",
                  // WebkitTextFillColor: "transparent",
                  color: "#d08123",
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
                  // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
                  // WebkitBackgroundClip: "text",
                  // WebkitTextFillColor: "transparent",
                  color: "#d08123",
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
