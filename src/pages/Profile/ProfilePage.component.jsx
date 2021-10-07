import React, { useState, useEffect } from "react";
import { authorized } from "../../api/authorized";

const ProfilePage = () => {
  const [name, setName] = useState("You-Know-Who");
  useEffect(() => {
    authorized()
      .then((res) => {
        setName(res.data.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>{name}</div>;
};

export default ProfilePage;
