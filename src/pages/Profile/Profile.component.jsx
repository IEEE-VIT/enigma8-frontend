import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../api/user";

const Profile = () => {
  const [user, setUser] = useState({
    username: "You-Know-Who",
    score: 0,
    rank: 0,
    email: "youknowwho@mail.com",
    stars: 0,
  });
  useEffect(() => {
    getUser()
      .then((res) => {
        console.log(res.data.data);
        setUser(res.data.data);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="profile-page">
      <div className="username">Username: {user.username}</div>
      <div className="scores">Scores: {user.score}</div>
      <div className="stars">Stars: {user.starts}⭐</div>
      <div className="rank">Rank: {user.rank}</div>
      <div className="email">Email: {user.email}</div>
      <div className="rooms-row">
        <Link to="/rooms">Rooms</Link>
      </div>
    </div>
  );
};

export default Profile;
