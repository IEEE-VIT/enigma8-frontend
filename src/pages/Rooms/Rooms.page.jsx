import React, { useState, useEffect } from "react";
import Room from "../../components/Room/Room.component";
import "./Rooms.styles.css";
import { allRooms } from "../../api/room";
import keys from "../../assets/profile/solved-key.svg";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [stars, setStars] = useState(0);
  useEffect(() => {
    allRooms()
      .then((res) => {
        for (let i = 0; i < res.data.data.data.length; i += 1) {
          setRooms((room) => [...room, res.data.data.data[i]]);
        }
        for (let i = 0; i < res.data.data.data.length; i += 1) {
          if (res.data.data.data[i].starsLeft > 0) {
            setStars(res.data.data.data[i].starsLeft);
            break;
          }
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
    <div className="rooms-page">
      <div className="rooms-status">
        <div className="room-status-text">Next room unlocks in {stars}</div>
        <img src={keys} alt="" />
      </div>
      <div className="rooms-container"> {roomslist}</div>
    </div>
  );
};

export default Rooms;
