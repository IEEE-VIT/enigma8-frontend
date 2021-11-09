import React, { useState, useEffect } from "react";
import { getTokenFirebase } from "../../firebaseInit";

const Notifications = () => {
  const [isTokenFound, setTokenFound] = useState(false);

  // To load once
  useEffect(() => {
    let data;
    console.log("Token found", isTokenFound);
    async function tokenFunc() {
      data = await getTokenFirebase(setTokenFound);
      if (data) {
        console.log("FCM Test Token:", data); // console log: need token for target testing, can remove it just before prod
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
