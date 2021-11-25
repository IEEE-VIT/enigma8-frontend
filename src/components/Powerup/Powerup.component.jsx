import React, { useState, useEffect } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Toast from "../Notifications/Toast.component";
import GoldenBtn from "../CustomButton/Golden/GoldenBtn.component";
import { getPowerups, selectPowerup } from "../../api/user";
import "./Powerup.styles.css";
import PowerupButton from "./PowerupButton.component";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: "#0b0b0b",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "80%",
    overflowY: "auto",
  },
}));

const Powerup = (props) => {
  const { roomId, openPowerup, handleClose } = props;
  const classes = useStyles();
  const history = useHistory();
  const [modalStyle] = useState({ top: "10%", left: "10%" });
  const [open] = useState(openPowerup);
  const [selectPowerupID, setSelectPowerupID] = useState("");
  const [powerupSelected, setPowerupSelected] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const selectPowerupButton = (id) => {
    setSelectPowerupID(id);
  };
  const [powerups, setPowerups] = useState([]);

  useEffect(() => {
    getPowerups()
      .then((res) => {
        for (let i = 0; i < res.data.data.powerups.length; i += 1) {
          const tempPowerup = {
            _id: res.data.data.powerups[i]._id,
            name: res.data.data.powerups[i].name,
            detail: res.data.data.powerups[i].detail,
            icon: res.data.data.powerups[i].icon,
            availableToUse: res.data.data.powerups[i].available_to_use,
          };
          setPowerups((powerup) => [...powerup, tempPowerup]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setPowerups([]);
    };
  }, []);

  const submitPowerup = () => {
    switch (selectPowerupID) {
      case undefined:
        setNotification({ title: "Error", body: "Please select a powerup" });
        break;
      case "":
        setPowerupSelected(true);
        setNotification({ title: "Error", body: "Please select a powerup" });
        setTimeout(() => {
          setPowerupSelected(false);
        }, 4000);
        break;
      default:
        selectPowerup(roomId, selectPowerupID)
          .then(() => {
            history.push({
              pathname: "/story",
            });
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const powerupList = powerups.map((powerup, index) => {
    // const bgColour = powerup._id === selectPowerupID ? "cyan" : "white";
    let bgColour = "black";
    if (!powerup.availableToUse) {
      bgColour = "black";
    } else if (powerup._id === selectPowerupID) {
      bgColour = "#004D54";
    } else {
      bgColour = "black";
    }
    return (
      <PowerupButton
        key={index}
        powerup={powerup}
        selectPowerupButton={selectPowerupButton}
        selectPowerupID={selectPowerupID}
        bgColour={bgColour}
      />
    );
  });
  const body = (
    <div style={modalStyle} className={`powerup-container ${classes.paper}`}>
      <h2 className="powerups-modal-title">Choose a powerup</h2>
      <div id="powerups-modal-description">
        {powerupList}
        <br />

        <button
          type="button"
          onClick={handleClose}
          style={{ marginTop: "10px" }}
        >
          Close
        </button>
        <GoldenBtn
          marginTop="40px"
          width="148px"
          triggerFunction={submitPowerup}
        >
          Continue
        </GoldenBtn>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {powerupSelected ? (
        <Toast title={notification.title} body={notification.body} />
      ) : (
        <> </>
      )}
    </div>
  );
};

Powerup.propTypes = {
  roomId: PropTypes.string.isRequired,
  openPowerup: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Powerup;
