import React, { useState, useEffect } from "react";
import { getTokenFirebase } from "../../firebaseInit";

const Notifications = () => {
  const [, setTokenFound] = useState(false);

  // To load once
  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getTokenFirebase(setTokenFound);
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
