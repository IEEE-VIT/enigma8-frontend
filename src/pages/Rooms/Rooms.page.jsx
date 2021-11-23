import React, { useState, useEffect } from "react";
import Room from "../../components/Room/Room.component";
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
  return (
    <div>
      Rooms
      <div className="rooms-container">{roomslist}</div>
    </div>
  );
};

export default Rooms;
