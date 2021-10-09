import React from "react";
import "./Room.styles.css";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Room = (props) => {
  const { roomId } = props;
  const history = useHistory();
  const questionCall = (event) => {
    console.log(event.target.id);
    history.push(`/question?room=${event.target.id}`);
  };
  return (
    <div>
      <button
        type="button"
        className="room-card"
        id={roomId}
        onClick={questionCall}
      >
        &nbsp;{roomId}
      </button>
    </div>
  );
};

Room.propTypes = {
  roomId: PropTypes.number.isRequired,
};
export default Room;
