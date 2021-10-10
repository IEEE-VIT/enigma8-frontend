import React from "react";
import Room from "../Room/Room.component";
import "./Rooms.styles.css";

const Rooms = () => {
  const roomId = [1, 2, 3, 4, 5, 6, 7, 8];
  const roomslist = roomId.map((roomid) => {
    return <Room key={roomid} roomId={roomid} />;
  });
  return (
    <div>
      Rooms
      <div className="rooms-container">{roomslist}</div>
    </div>
  );
};

export default Rooms;
