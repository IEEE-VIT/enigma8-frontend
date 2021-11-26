import React, { useState, useEffect } from "react";
import Room from "../../components/Room/Room.component";
import "./Rooms.styles.css";
import { allRooms } from "../../api/room";
import keys from "../../assets/profile/solved-key.svg";
// import pillar from "../../assets/rooms/pillar.svg";

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

  const roomsListUpper = rooms.map((room, index) => {
    if (index < 4) {
      return (
        <Room key={room.room.roomNo} room={room.room} journey={room.journey} />
      );
    }
    return <></>;
  });
  const roomsListLower = rooms.map((room, index) => {
    if (index > 3) {
      return (
        <Room key={room.room.roomNo} room={room.room} journey={room.journey} />
      );
    }
    return <></>;
  });
  return (
    <div className="rooms-page">
      <div className="rooms-status">
        <div className="room-status-text">Next room unlocks in {stars}</div>
        <img src={keys} alt="" />
      </div>
      <div className="rooms-container-upper rooms-container">
        {roomsListUpper}
      </div>
      <div className="rooms-container-lower rooms-container">
        {roomsListLower}
      </div>
      {/* <div className="pillar-container">
        <img
          className="pillar pillar-top  pillar-left pillar-left-top"
          src={pillar}
          alt=""
        />
        <img
          className="pillar pillar-bottom pillar-left pillar-left-bottom"
          src={pillar}
          alt=""
        />
        <img
          className="pillar pillar-top pillar-right pillar-right-top"
          src={pillar}
          alt=""
        />
        <img
          className="pillar pillar-bottom pillar-right pillar-right-bottom"
          src={pillar}
          alt=""
        />
      </div> */}
    </div>
  );
};

export default Rooms;
