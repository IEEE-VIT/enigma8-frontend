import React, { useState } from "react";
import "./PushNotifs.styles.css";
import { onMessageListener } from "../../firebaseInit";

import Fader from "../../components/Notifications/Fader.component";
import Token from "../../components/Notifications/Token.component";
import Toast from "../../components/Notifications/Toast.component";

const PushNotifs = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));
  return (
    <div className="App">
      {show ? (
        <Toast title={notification.title} body={notification.body} />
      ) : (
        <></>
      )}
      <Token />
      <Fader text="" />
    </div>
  );
};

export default PushNotifs;
