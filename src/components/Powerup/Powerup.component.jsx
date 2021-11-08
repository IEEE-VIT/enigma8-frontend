import React, { useState, useEffect } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Toast from "../Notifications/Toast.component";
import { getPowerups, selectPowerup } from "../../api/user";
import "./Powerup.styles.css";
import PowerupButton from "./PowerupButton.component";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "80%",
    overflowY: "auto",
  },
}));

const Powerup = (props) => {
  const { roomID, openPowerup, handleClose } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [modalStyle] = useState({ top: "10%", left: "10%" });
  const [open] = useState(openPowerup);
  const [selectPowerupID, setSelectPowerupID] = useState("");
  const [powerupSelected, setPowerupSelected] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  console.log("Hi!", openPowerup);

  const selectPowerupButton = (id) => {
    setSelectPowerupID(id);
  };
  const [powerups, setPowerups] = useState([]);

  useEffect(() => {
    getPowerups()
      .then((res) => {
        for (let i = 0; i < res.data.data.powerups.length; i += 1) {
          setPowerups((powerup) => [...powerup, res.data.data.powerups[i]]);
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
    console.log(selectPowerupID);
    console.log("Room ID", roomID);
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
        selectPowerup(roomID, selectPowerupID)
          .then((res) => {
            console.log(res);
            history.push({
              pathname: "/question",
              state: { ...location.state, roomID },
            });
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const powerupList = powerups.map((powerup, index) => {
    const bgColour = powerup._id === selectPowerupID ? "cyan" : "white";
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
    <div style={modalStyle} className={classes.paper}>
      <h2 id="powerups-modal-title">
        Choose a powerup before entering a room.
      </h2>
      <div id="powerups-modal-description">
        <button type="button" onClick={submitPowerup}>
          Continue
        </button>
        {powerupList}
        <br />

        <button
          type="button"
          onClick={handleClose}
          style={{ marginTop: "10px" }}
        >
          Close
        </button>
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
  roomID: PropTypes.string.isRequired,
  openPowerup: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Powerup;
