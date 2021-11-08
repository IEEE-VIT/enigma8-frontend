import React, { useState, useEffect } from "react";
import Room from "../../components/Room/Room.component";
// import Onboarding from "../Onboarding/Onboarding.page";
import "./Rooms.styles.css";
import { allRooms } from "../../api/room";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    allRooms()
      .then((res) => {
        for (let i = 0; i < res.data.data.data.length; i += 1) {
          setRooms((room) => [...room, res.data.data.data[i]]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const roomslist = rooms.map((room) => {
    return (
      <Room key={room.room.roomNo} room={room.room} journey={room.journey} />
    );
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
