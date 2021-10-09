import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authorized } from "../../api/authorized";

const ProfilePage = () => {
  const [email, setEmail] = useState("You-Know-Who");
  useEffect(() => {
    authorized()
      .then((res) => {
        setEmail(res.data.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="profile-page">
      <div className="username">Username: username</div>
      <div className="scores">Scores: 100</div>
      <div className="stars">Stars: 15 ⭐</div>
      <div className="rank">Rank: 23</div>
      <div className="email">Email: {email}</div>
      <div className="rooms-row">
        <Link to="/rooms">Rooms</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
