import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { timer } from "../../api/timer";
import OverlayModal from "../../components/CustomModal/OverlayModal/OverlayModal.component";

const Countdown = () => {
  const history = useHistory();
  const [is420, setIs420] = useState(false);
  const [remTime, setRemTime] = useState(0);
  const [daysRight, setDaysRight] = useState(0);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursRight, setHoursRight] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesRight, setMinutesRight] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsRight, setSecondsRight] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [wrongSystemTime, setWrongSystemTime] = useState(false);
  const getRemTime = () => {
    timer()
      .then(async (res) => {
        await console.log(res.data.data);
        console.log((new Date("2021-11-26T16:20") - new Date()) / 1000);
        if (
          Math.floor((new Date("2021-11-26T16:20") - new Date()) / 10000) !==
          Math.floor(res.data.data.date / 10)
        ) {
          setWrongSystemTime(true);
        }
        setRemTime(res.data.data.date);
        setIs420(res.data.data.enigmaStarted);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderTime = () => {
    let tempMinutes = Math.floor(remTime / 60);
    const tempSeconds = remTime % 60;
    let tempHours = Math.floor(tempMinutes / 60);
    tempMinutes %= 60;
    const tempDays = Math.floor(tempHours / 24);
    tempHours %= 24;
    setDaysRight(tempDays % 10);
    setDaysLeft(Math.floor(tempDays / 10) % 10);
    setHoursRight(tempHours % 10);
    setHoursLeft(Math.floor(tempHours / 10) % 10);
    setMinutesRight(tempMinutes % 10);
    setMinutesLeft(Math.floor(tempMinutes / 10) % 10);
    setSecondsRight(tempSeconds % 10);
    setSecondsLeft(Math.floor(tempSeconds / 10) % 10);
  };

  const decrementTime = () => {
    setRemTime(remTime - 1);
  };

  const updateRemTime = () => {
    renderTime();
    if (remTime !== 0) {
      setTimeout(decrementTime, 1000);
    } else if (remTime === 0) {
      getRemTime();
    }
  };
  useEffect(getRemTime, []);
  useEffect(updateRemTime, [remTime]);
  const handleonClick = () => {
    history.push("/rooms");
    setIs420(false);
  };
  const ContinueButton = (
    <button type="button" onClick={handleonClick}>
      Continue
    </button>
  );

  const Timer = () => {
    return (
      <div>
        <div>
          <h1>Days : Hours : Minutes : Seconds</h1>
          <h1>
            {daysLeft}
            {daysRight} : {hoursLeft}
            {hoursRight} : {minutesLeft}
            {minutesRight} : {secondsLeft}
            {secondsRight}
          </h1>
        </div>
        <div> {is420 ? ContinueButton : ""} </div>
      </div>
    );
  };

  const MockQuestion = () => {
    return (
      <div>
        <h1>
          Can&apos;t wait? Here&apos;s a mock question for you.
          <br />
          <Link to="/mockquestion"> Click Here </Link>
          <br />
        </h1>
      </div>
    );
  };
  return (
    <div>
      <Timer />
      <MockQuestion />
      {wrongSystemTime ? (
        <OverlayModal innerText="Please correct your system time and reload." />
      ) : (
        <> </>
      )}
      <Link to="/rooms">Rooms</Link>
    </div>
  );
};

export default Countdown;
