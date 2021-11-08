import React, { useState } from "react";
import "./Room.styles.css";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Toast from "../Notifications/Toast.component";
import locked from "../../assets/locked.svg";
import solved from "../../assets/solved.svg";
import unsolvedUnlocked from "../../assets/unsolved-unlocked.svg";
import { checkIfRoomUnlocked } from "../../api/room";
import Powerup from "../Powerup/Powerup.component";

const Room = (props) => {
  const { room, journey } = props;
  const [lockedRoom, setLockedRoom] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [openPowerup, setOpenPowerup] = useState(false);
  const handleClose = () => {
    setOpenPowerup(false);
  };
  const history = useHistory();
  const location = useLocation();
  const questionCall = (event) => {
    if (!journey.roomUnlocked) {
      checkIfRoomUnlocked(room._id)
        .then((res) => {
          console.log(res.data.data);
          switch (res.data.data.unlock) {
            case true:
              // history.push({
              //   pathname: "/question",
              //   state: { ...location.state, roomID: event.target.id },
              // });
              setOpenPowerup(true);
              console.log(event.target.id);
              break;
            default:
              setLockedRoom(true);
              setNotification({
                title: "Room Locked",
                body: `You need ${res.data.data.starsNeeded} stars to unlock the room.`,
              });
              setTimeout(() => {
                setLockedRoom(false);
              }, 4000);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history.push({
        pathname: "/question",
        state: { ...location.state, roomID: event.target.id },
      });
    }
  };

  const questionsStatus = journey.questionsStatus.map(
    (status, index, questionIMG) => {
      if (status === "locked") {
        questionIMG = locked;
      } else if (status === "solved") {
        questionIMG = solved;
      } else if (status === "unlocked") {
        questionIMG = unsolvedUnlocked;
      }

      return (
        <img
          className="question-image"
          key={index}
          src={questionIMG}
          alt="room-status"
        />
      );
    }
  );
  return (
    <div>
      <div className="room-container">
        {" "}
        <div className="room-question-status">{questionsStatus}</div>
        <button
          type="button"
          className="room-card"
          id={room._id}
          onClick={questionCall}
        >
          &nbsp;{room.roomNo}
        </button>
      </div>
      {lockedRoom ? (
        <Toast title={notification.title} body={notification.body} />
      ) : (
        <> </>
      )}
      {openPowerup ? (
        <Powerup
          openPowerup={openPowerup}
          handleClose={handleClose}
          roomID={room._id}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roomNo: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    starQuota: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    questionId: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  journey: PropTypes.shape({
    // powerupId: PropTypes.string.isRequired,
    powerupUsed: PropTypes.bool.isRequired,
    questionsStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    // roomId: PropTypes.string.isRequired,
    roomUnlocked: PropTypes.bool.isRequired,
    stars: PropTypes.number.isRequired,
    // userId: PropTypes.string.isRequired,
    // _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Room;
