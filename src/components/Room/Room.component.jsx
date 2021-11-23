import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Consumer from "../../contexts/Joyride.context";
import "./Room.styles.css";
import Toast from "../Notifications/Toast.component";
import locked from "../../assets/rooms/locked.svg";
import solved from "../../assets/rooms/solved.svg";
import unsolvedUnlocked from "../../assets/rooms/unsolved-unlocked.svg";
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
  const PowerupComponent = () => {
    // const { switchJoyride } = context;
    // switchJoyride(true);
    return (
      <Powerup
        openPowerup={openPowerup}
        handleClose={handleClose}
        roomId={room._id}
        roomNo={room.roomNo}
      />
    );
  };
  const history = useHistory();
  const location = useLocation();
  const questionCall = (context) => {
    if (!journey.roomUnlocked) {
      checkIfRoomUnlocked(room._id)
        .then((res) => {
          if (res.data.data.unlock) {
            setLockedRoom(true);
            setNotification({
              title: "Room Locked",
              body: `You need ${res.data.data.starsNeeded} stars to unlock the room.`,
            });
            setTimeout(() => {
              setLockedRoom(false);
            }, 4000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (journey.roomUnlocked && journey.powerupSet === "no") {
      setOpenPowerup(true);
    } else {
      history.push({
        pathname: "/question",
        state: { ...location.state, roomNo: room.roomNo, roomId: room._id },
      });
    }
    context.switchJoyride(false, 0);
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
    <Consumer>
      {(context) => {
        return (
          <div>
            <div className="room-container">
              {" "}
              <div className="room-question-status">{questionsStatus}</div>
              <button
                type="button"
                className={`room-card roomno-${room.roomNo}`}
                id={room._id}
                onClick={() => {
                  questionCall(context);
                  context.switchJoyride(false);
                }}
              >
                &nbsp;{room.roomNo}
              </button>
            </div>
            {lockedRoom ? (
              <Toast title={notification.title} body={notification.body} />
            ) : (
              <> </>
            )}
            {openPowerup ? PowerupComponent() : <></>}
          </div>
        );
      }}
    </Consumer>
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
    questionsStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
    // roomId: PropTypes.string.isRequired,
    roomUnlocked: PropTypes.bool.isRequired,
    stars: PropTypes.number.isRequired,
    powerupSet: PropTypes.string.isRequired,
    powerupUsed: PropTypes.string.isRequired,
    // userId: PropTypes.string.isRequired,
    // _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Room;
