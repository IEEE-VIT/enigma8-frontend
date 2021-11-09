import React, { useEffect, useState } from "react";
import timer from "../../api/timer";

const TimerPage = () => {
  const [remTime, setRemTime] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const renderTime = () => {
    let tempMinutes = Math.floor(remTime / 60);
    const tempSeconds = remTime % 60;
    let tempHours = Math.floor(tempMinutes / 60);
    tempMinutes %= 60;
    const tempDays = Math.floor(tempHours / 24);
    tempHours %= 24;
    setDays(tempDays);
    setHours(tempHours);
    setMinutes(tempMinutes);
    setSeconds(tempSeconds);
  };

  const decrementTime = () => {
    setRemTime(remTime - 1);
  };

  const updateRemTime = () => {
    renderTime();
    if (remTime !== 0) {
      setTimeout(decrementTime, 1000);
    }
  };

  const getRemTime = async () => {
    const time = await timer();
    setRemTime(time);
  };

  useEffect(getRemTime, []);
  useEffect(updateRemTime, [remTime]);

  return (
    <div>
      <h1>Days : Hours : Minutes : Seconds</h1>
      <h1>
        {days} : {hours} :{minutes} : {seconds}
      </h1>
    </div>
  );
};

export default TimerPage;
