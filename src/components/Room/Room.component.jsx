import React, { useState } from "react";
import "./Room.styles.css";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Toast from "../Notifications/Toast.component";
import locked from "../../assets/locked.svg";
import solved from "../../assets/solved.svg";
import unsolvedUnlocked from "../../assets/unsolved-unlocked.svg";

const Room = (props) => {
  const { room, journey } = props;
  const [lockedRoom, setLockedRoom] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const history = useHistory();
  const questionCall = () => {
    if (!journey.roomUnlocked) {
      setLockedRoom(true);
      setNotification({
        title: "Room Locked",
        body: "You need to unlock the room first",
      });
      setTimeout(() => {
        setLockedRoom(false);
      }, 4000);
    } else {
      history.push({
        pathname: "/question",
        state: { roomNo: room.roomNo, roomId: room._id },
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
