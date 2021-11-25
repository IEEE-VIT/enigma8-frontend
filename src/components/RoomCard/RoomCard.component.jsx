import React, { useState } from "react";
import "./RoomCard.styles.css";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Toast from "../Notifications/Toast.component";
import locked from "../../assets/profile/unsolved-key.svg";
import solved from "../../assets/profile/solved-key.svg";
import { checkIfRoomUnlocked } from "../../api/room";
import Powerup from "../Powerup/Powerup.component";

const RoomCard = (props) => {
  const { room, journey, currentRoom } = props;
  const [lockedRoom, setLockedRoom] = useState(false);
  const [questionSolved, setQuestionSolved] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [openPowerup, setOpenPowerup] = useState(false);
  const handleClose = () => {
    setOpenPowerup(false);
  };
  const history = useHistory();
  const location = useLocation();
  const questionCall = () => {
    checkIfRoomUnlocked(room._id)
      .then((res) => {
        switch (res.data.data.status) {
          case "locked":
            setLockedRoom(true);
            setNotification({
              title: "Room Locked",
              body: `You need ${res.data.data.starsNeeded} stars to unlock the room.`,
            });
            setTimeout(() => {
              setLockedRoom(false);
            }, 4000);
            break;
          case "complete":
            setQuestionSolved(true);
            setNotification({
              title: "Room Solved",
              body: `You have solved the room.`,
            });
            setTimeout(() => {
              setQuestionSolved(false);
            }, 4000);
            break;
          case "unlocked":
            history.push({
              pathname: "/question",
              state: {
                ...location.state,
                roomNo: room.roomNo,
                roomId: room._id,
              },
            });
            break;
          case "canUnlock":
            setOpenPowerup(true);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const questionsStatus = journey.questionsStatus.map(
    (status, index, questionIMG) => {
      if (status === "solved") {
        questionIMG = solved;
      } else {
        questionIMG = locked;
      }

      return (
        <img
          className="key-img"
          key={index}
          src={questionIMG}
          alt="room-status"
        />
      );
    }
  );
  const colorStatus = () => {
    if (currentRoom) {
      return "#4DA9E5";
    }
    if (journey.roomUnlocked) {
      return "#4FEF9A";
    }
    return "#4F4F4F";
  };
  const style = {
    backgroundColor: colorStatus(),
  };
  return (
    <div>
      <div className="progress-bar-container">
        <div className="progress-bar-status">{questionsStatus}</div>
        <button
          type="button"
          className="progress-bar-room-card"
          id={room._id}
          onClick={questionCall}
          style={style}
        >
          {room.roomNo}
        </button>
        <div className="room-number">{`Room ${room.roomNo}`}</div>
      </div>
      {lockedRoom ? (
        <Toast title={notification.title} body={notification.body} />
      ) : (
        <> </>
      )}
      {questionSolved ? (
        <Toast title={notification.title} body={notification.body} />
      ) : (
        <> </>
      )}
      {openPowerup ? (
        <Powerup
          openPowerup={openPowerup}
          handleClose={handleClose}
          roomId={room._id}
          roomNo={room.roomNo}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

RoomCard.propTypes = {
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
    questionsStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    // roomId: PropTypes.string.isRequired,
    roomUnlocked: PropTypes.bool.isRequired,
    stars: PropTypes.number.isRequired,
    powerupSet: PropTypes.string.isRequired,
    powerupUsed: PropTypes.string.isRequired,
    // userId: PropTypes.string.isRequired,
    // _id: PropTypes.string.isRequired,
  }).isRequired,
  currentRoom: PropTypes.bool.isRequired,
};

export default RoomCard;
