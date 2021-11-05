import React from "react";
import Room from "../../components/Room/Room.component";
// import Onboarding from "../Onboarding/Onboarding.page";
import "./Rooms.styles.css";

const Rooms = () => {
  const roomId = [1, 2, 3, 4, 5, 6, 7, 8];
  const roomslist = roomId.map((roomid) => {
    return <Room key={roomid} roomId={roomid} />;
  });
  const stars = 2;

  return (
    <div>
      {/* <Onboarding /> */}
      <div className="onboarding-pointer-stars">
        Next room in: {stars} more stars
      </div>
      <div className="onboarding-pointer-rooms">Rooms</div>

      <div className="rooms-container">{roomslist}</div>
    </div>
  );
};

export default Rooms;
