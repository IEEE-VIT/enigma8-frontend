import React, { useState, useEffect } from "react";
import Room from "../../components/Room/Room.component";
import "./Rooms.styles.css";
import { allRooms } from "../../api/room";
import { feedbackfilled } from "../../api/feedback";
import keys from "../../assets/profile/solved-key.svg";
import Loader from "../../components/Loader/Loader.component";
import Feedback from "../../assets/rooms/feedback.svg";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [stars, setStars] = useState(0);
  const [filled, setFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    feedbackfilled()
      .then((res) => {
        setFilled(res.data.data.feedbackfilled);
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="rooms-page">
      {filled ? (
        <a href="/feedback">
          <img
            src={Feedback}
            alt=""
            className="rooms-feedback-img cursor-pointer"
          />
        </a>
      ) : (
        ""
      )}

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
    </div>
  );
};

export default Rooms;
