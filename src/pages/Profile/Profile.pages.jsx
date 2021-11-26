import React, { useState, useEffect } from "react";
import "./Profile.styles.css";
import { getUser } from "../../api/user";
import { allRooms } from "../../api/room";
import solved from "../../assets/profile/solved-key.svg";
import RoomCard from "../../components/RoomCard/RoomCard.component";
import SecretChamber from "../../assets/profile/room-9.svg";
import Background from "../../assets/profile/bird-bg.svg";
import Loader from "../../components/Loader/Loader.component";

const Profile = () => {
  const [user, setUser] = useState({
    username: "You-Know-Who",
    score: 0,
    rank: 0,
    email: "youknowwho@mail.com",
    stars: 0,
  });
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    allRooms()
      .then((res) => {
        for (let i = 0; i < res.data.data.data.length; i += 1) {
          setRooms((room) => [...room, res.data.data.data[i]]);
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
    getUser()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const roomslist = rooms.map((room) => {
    return (
      <RoomCard
        currentRoom={user.currentRoomId === room.room._id}
        key={room.room.roomNo}
        room={room.room}
        journey={room.journey}
      />
    );
  });

  const profileData = [
    { category: "Username", value: user.username },
    { category: "Score", value: user.score },
    { category: "Keys", value: user.starts },
    { category: "Rank", value: user.rank },
    { category: "Email ID", value: user.email },
  ];

  const profileDisplay = profileData.map((item) => {
    if (item.category === "Keys") {
      return (
        <div className="profile-card-row">
          <div className="profile-card-item profile-card-item-1">
            {item.category}
          </div>
          <div className="profile-card-item profile-card-item-2">:</div>
          <div className="profile-card-item profile-card-item-3">
            {item.value}{" "}
            <img src={solved} alt="" className="profile-card-item-3-img" />
          </div>
        </div>
      );
    }
    return (
      <div className="profile-card-row">
        <div className="profile-card-item profile-card-item-1">
          {item.category}
        </div>
        <div className="profile-card-item profile-card-item-2">:</div>
        <div className="profile-card-item profile-card-item-3">
          {item.value}
        </div>
      </div>
    );
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="profile-page-container">
      <div className="profile-content-container">
        <div className="profile-card-container">
          <div className="profile-card-heading">My Profile</div>
          <div className="profile-card">{profileDisplay}</div>
        </div>
        <div className="profile-progress">
          <div className="profile-progress-heading">PROGRESS</div>
          <div className="progress-bar">
            {roomslist}{" "}
            <img
              src={SecretChamber}
              alt=""
              className="profile-secret-chamber"
            />
          </div>
        </div>
      </div>
      <img src={Background} className="profile-bg" alt="" />
    </div>
  );
};

export default Profile;
