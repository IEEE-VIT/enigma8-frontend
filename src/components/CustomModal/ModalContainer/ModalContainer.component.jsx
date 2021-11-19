import React, { useState } from "react";
import { Modal, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import "./ModalContainer.styles.css";
import OutlineGoldenBtn from "../../CustomButton/OutlineGolden/OutlineGoldenBtn.component";
import Close from "../../../assets/modals/close.svg";

const ModalContainer = ({ innerText, openText, type, header }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "#121212",
    border: "2.5px solid transparent",
    // borderImage: "linear-gradient(to right, #0FA3B1, #037EC3)",
    // borderImageSlice: 1,
    borderColor: "#037EC3",
    borderRadius: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    fontFamily: "Mulish",
    boxShadow: 24,
    "@media screen and (max-width: 786px)": {
      width: "90%",
    },
  };
  return (
    <div>
      {type === "outlined" ? (
        <OutlineGoldenBtn
          triggerFunction={handleOpen}
          marginTop="0px"
          width="130px"
        >
          {openText}
        </OutlineGoldenBtn>
      ) : (
        <></>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-box">
          <Box sx={style}>
            <div style={{ width: "100%", textAlign: "right" }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  marginTop: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  padding: "0",
                }}
              >
                <img
                  src={Close}
                  style={{ height: 25, cursor: "pointer" }}
                  alt=""
                />
              </button>
            </div>
            <div
              className="box-modal"
              style={{
                color: "#0FA3B1",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingBottom: "32px",
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
                  marginTop: "8px",
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
  innerText: PropTypes.element.isRequired,
  openText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};
export default ModalContainer;
