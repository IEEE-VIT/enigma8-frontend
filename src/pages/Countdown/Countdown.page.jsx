import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import CountdownBg from "../../assets/countdown/countdown-page-bg.svg";
import Brazier from "../../assets/countdown/brazier-countdown-page.svg";
import { timer } from "../../api/timer";
import OverlayModal from "../../components/CustomModal/OverlayModal/OverlayModal.component";
import TimerComponent from "../../components/TimerCard/TimerCard.component";
import "./Countdown.styles.css";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "black",
    backgroundImage: `url(${CountdownBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "calc(100% - 99px)",
    color: "white",
    backgroundPosition: "center",
  },
  countdownTime: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownTimeText: {
    fontSize: "22px",
    fontWeight: "400",
    margin: "23.53px auto",
    textAlign: "center",
    fontFamily: "Mulish",
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  countdownTimeHeader: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "60px 18px",
    textAlign: "center",
    fontFamily: "Cinzel Decorative",
    background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  mockQuestionText: {
    fontSize: "32px",
    fontWeight: "normal",
    margin: "23.53px 18px",
    textAlign: "center",
    fontFamily: "Mulish",
    color: "#0FA3B1",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  brazier: {
    position: "absolute",
    bottom: "0",
    height: "55%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  countdownPageSeconds: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Countdown = () => {
  const classes = useStyles();
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
        if (
          Math.floor((new Date("2021-11-26T16:20") - new Date()) / 100000) !==
          Math.floor((await res.data.data.date) / 100)
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

  const mockQuestion = () => {
    history.push("/mockquestion");
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
          <div className={`${classes.countdownTimeHeader}`}>
            {is420
              ? "The wait is over!"
              : "The Ultimate Cryptic Hunt Begins In"}
          </div>

          <div className="countdown-page-container">
            <div
              className={`${classes.countdownPageDays} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="large" number={daysLeft} />
                <TimerComponent size="large" number={daysRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Days
              </div>
            </div>
            <div
              className={`${classes.countdownPageHours} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="large" number={hoursLeft} />
                <TimerComponent size="large" number={hoursRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Hours
              </div>
            </div>
            <div
              className={`${classes.countdownPageMinutes} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="large" number={minutesLeft} />
                <TimerComponent size="large" number={minutesRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Minutes
              </div>
            </div>
            <div
              className={`${classes.countdownPageSeconds} countdown-time-container`}
            >
              <div className={`${classes.countdownTime}`}>
                <TimerComponent size="large" number={secondsLeft} />
                <TimerComponent size="large" number={secondsRight} />
              </div>
              <div
                className={`countdown-page-days-text ${classes.countdownTimeText}`}
              >
                Seconds
              </div>
            </div>
          </div>
        </div>
        <div> {is420 ? ContinueButton : ""} </div>
      </div>
    );
  };

  const MockQuestion = () => {
    return (
      <div>
        <div className={`${classes.mockQuestionText}`}>
          {is420 ? "" : "Can't wait? Here's a mock question for you."}
          {is420 ? (
            <> </>
          ) : (
            <GoldenBtn
              marginTop="40px"
              width="148px"
              triggerFunction={mockQuestion}
            >
              Click Here
            </GoldenBtn>
          )}
        </div>
      </div>
    );
  };
  return (
    <div className={`countdown-page ${classes.root}`}>
      &nbsp;
      <Timer />
      <MockQuestion />
      {wrongSystemTime ? (
        <OverlayModal
          header="Your clock is inaccurate"
          innerText="Adjust the system time and date and reload the page."
        />
      ) : (
        <> </>
      )}
      <img src={Brazier} className={`brazier-left ${classes.brazier}`} alt="" />
      <img
        src={Brazier}
        className={`brazier-right ${classes.brazier}`}
        alt=""
      />
    </div>
  );
};

export default Countdown;
