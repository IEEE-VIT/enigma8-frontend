import React, { useState, useEffect } from "react";
import { TextField, Paper, makeStyles } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import {
  getQuestion,
  submitAnswer,
  useHint,
  usePowerup,
} from "../../api/transact";
import ModalContainer from "../../components/CustomModal/ModalContainer/ModalContainer.component";
import PowerupModalContainer from "../../components/CustomModal/PowerupModalContainer/PowerupModalContainer.component";
import BlueOverlayModal from "../../components/CustomModal/BlueOverlayModal/BlueOverlayModal.component";
import BlueBtn from "../../components/CustomButton/Blue/BlueBtn.component";
import NestedModal from "../../components/CustomModal/NestedModal/NestedModal.component";
import "./Question.styles.css";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.main,
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    fontFamily: "Mulish",
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    padding: "1% 2% 0 2%",
    backgroundColor: theme.palette.secondary.main,
    fontFamily: "Mulish",
    color: theme.palette.primary.main,
    display: "flex",
    margin: "12px 0 12px 0 !important",
    "& .MuiFormLabel-root": {
      // color: theme.palette.primary.main,
      // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
      // WebkitBackgroundClip: "text",
      // WebkitTextFillColor: "transparent",
      color: "#d08123",
    },
    "& .MuiFormControl-root": {
      width: "100% !important",
    },
    "& .MuiInputLabel-root": {
      // color: "white",
    },
    "& .MuiInputBase-input": {
      // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
      // WebkitBackgroundClip: "text",
      // WebkitTextFillColor: "transparent",
      color: "#d08123",
    },
    "& .MuiFormHelperText-root": {
      // background: "red",
      // WebkitBackgroundClip: "text",
      // WebkitTextFillColor: "transparent",
      color: "red",
    },
    "& label.Mui-focused": {
      // color: "white",
    },
    "& .PrivateSwitchBase-input": {
      // color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D08123",
      },
      "&:hover fieldset": {
        borderColor: "#FFD37C",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D08123",
      },
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiSelect-select:not([multiple]) option": {
      backgroundColor: "black",
    },
  },
}));

const Question = () => {
  const [question, setQuestion] = useState("");
  const [media, setMedia] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [isHint, setIsHint] = useState(false);
  const [hint, setHint] = useState("");
  const [isPowerUp, setIsPowerUp] = useState(false);
  const [powerUp, setPowerUp] = useState("");
  const [isCloseAnswer, setIsCloseAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [nextRoomUnlocked, setNextRoomUnlocked] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState({});
  const history = useHistory();
  const location = useLocation();
  if (location.state === undefined) {
    window.location.href = "/rooms";
  }
  const { roomId, roomNo } = location.state;
  const [questionNum, setQuestionNum] = useState();
  const [powerupName, setPowerupName] = useState("");
  const [powerupIcon, setPowerupIcon] = useState("");
  const [powerupUsed, setPowerupUsed] = useState(false);
  const goBack = () => {
    history.push({
      pathname: "/rooms",
    });
  };

  const classes = useStyles();
  const closeCloseAnswer = () => {
    setIsCloseAnswer(false);
  };

  const handlePowerUp = () => {
    usePowerup(roomId)
      .then((res) => {
        console.log(res.data.data.text);
        // Set PowerUp Image
        setIsPowerUp(true);
        setPowerUp(`${res.data.data.text} ${res.data.data.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchQuestion = () => {
    getQuestion(roomId)
      .then((res) => {
        const info = res.data.data;
        setQuestion(info.question.text);
        setQuestionNum(info.question.questionNo);
        setMedia(info.question.media);
        setMediaType(info.question.mediaType);
        setPowerupIcon(info.powerupDetails.icon);
        setPowerupName(info.powerupDetails.name);
        if (info.hint !== null) {
          setIsHint(true);
          setHint(info.hint);
        }
        if (info.powerupUsed === "active") {
          setIsPowerUp(true);
          handlePowerUp();
        }
        if (info.powerupUsed === "yes") {
          setPowerupUsed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeCorrectAnswer = () => {
    if (nextRoomUnlocked) {
      history.push({
        pathname: "/rooms",
      });
    } else if (questionNum === 3) {
      history.push({
        pathname: "/rooms",
      });
    } else {
      fetchQuestion();
      setIsCorrectAnswer(false);
    }
  };
  const closeAnswered = () => {
    return (
      <div>
        <h4 style={{ marginBottom: 30, marginTop: 0 }}>
          Your answer is close to the actual answer!
        </h4>
        <BlueBtn
          triggerFunction={closeCloseAnswer}
          marginTop="0"
          width="280.74px"
        >
          Continue
        </BlueBtn>
      </div>
    );
  };
  const correctAnswered = () => {
    return (
      <div>
        <h4 style={{ marginBottom: 30, marginTop: 0 }}>
          Your answer is correct! You earnt {scoreEarned} points!
        </h4>
        <BlueBtn
          triggerFunction={closeCorrectAnswer}
          marginTop="0"
          width="280.74px"
        >
          Continue
        </BlueBtn>
      </div>
    );
  };
  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSetAnswer = (e) => {
    const { value } = e.target;
    wrongAnswer.status = false;
    wrongAnswer.helper = "";
    setWrongAnswer({ ...wrongAnswer });
    setAnswer(value);
  };
  const handleSubmit = () => {
    submitAnswer(roomId, answer)
      .then((res) => {
        setIsCloseAnswer(res.data.data.closeAnswer);
        setIsCorrectAnswer(res.data.data.correctAnswer);
        if (!res.data.data.correctAnswer) {
          wrongAnswer.status = !res.data.data.correctAnswer;
          wrongAnswer.helper = "Keep trying!";
          setWrongAnswer({ ...wrongAnswer });
        }
        setNextRoomUnlocked(res.data.data.nextRoomUnlocked);
        setScoreEarned(res.data.data.scoreEarned);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleHint = () => {
    useHint(roomId)
      .then((res) => {
        setIsHint(true);
        setHint(res.data.data.hint);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const HintModal = () => {
    const PreHintText = "If you use hint, then your points will be reduced.";
    const PostHintText = `${hint}`;
    return (
      <NestedModal
        stateValue={isHint}
        PreMessage={PreHintText}
        ButtonText="Use Hint"
        triggerFunction={handleHint}
        PostMessage={PostHintText}
      />
    );
  };
  const PowerUpModal = () => {
    const PrePowerUpText = `This powerup can be used only once in this room. Are you sure you want to use ${powerupName} powerup for this question?`;
    const PostPowerUpText = `${powerUp}`;

    if (powerupUsed === true) {
      return <div>You&apos;ve already claimed your powerup for this room.</div>;
    }
    // const getPowerupIcon = () => {
    //   return (
    //     <div>
    //       <img src={powerupIcon} alt="" />
    //     </div>
    //   );
    // };
    return (
      <NestedModal
        stateValue={isPowerUp}
        PreMessage={PrePowerUpText}
        ButtonText="Use Powerup"
        triggerFunction={handlePowerUp}
        PostMessage={PostPowerUpText}
      />
    );
  };
  return (
    <div className="question-page">
      <div className="question-section-1-room-heading">Room {roomNo}</div>
      <div className="question-box">
        <div className="question-container">
          <div className="question-section-1">
            <div className="question-section-1-top">
              <div className="question-section-1-backBtn">
                <button
                  className="question-section-1-backBtn-text"
                  type="button"
                  onClick={goBack}
                >
                  Back
                </button>
              </div>
              <div className="question-section-1-question">
                <div className="question-section-1-questionNo">
                  Q. {questionNum}
                </div>
                <div className="question-section-1-text">
                  Question: {question}
                </div>
              </div>
            </div>
            {isHint ? (
              <div className="question-section-1-hint-display">
                <div className="question-section-1-hint-text-heading">HINT</div>
                <div className="question-section-1-hint-text">{hint}</div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="question-section-2">
            <div className="question-section-2-media">
              {mediaType === "image/png" ? (
                <img style={{ width: "25vw" }} src={media} alt="" />
              ) : (
                <> </>
              )}
              {mediaType === "video/mp4" ? (
                <video width="320" height="240" controls src={media} />
              ) : (
                <> </>
              )}
            </div>
            <div className="question-section-2-answerfield">
              <Paper className={`${classes.paper}`}>
                <TextField
                  id="answer"
                  label="Enter Answer"
                  name="answer"
                  variant="outlined"
                  required
                  className={`text-field ${classes.root}`}
                  onChange={handleSetAnswer}
                  error={wrongAnswer.status}
                  helperText={wrongAnswer.helper}
                />
              </Paper>
            </div>
            <div
              className="question-section-2-Btn"
              style={{ justifyContent: "space-around" }}
            >
              <ModalContainer
                innerText={HintModal()}
                openText="Hint"
                type="outlined"
                header="HINT"
              />
              <GoldenBtn
                marginTop="0px"
                width="148px"
                triggerFunction={handleSubmit}
              >
                Submit
              </GoldenBtn>
            </div>
          </div>
        </div>
      </div>
      <div className="powerup">
        <PowerupModalContainer
          innerText={PowerUpModal()}
          openText="Powerup"
          powerupName={powerupName}
          powerupIcon={powerupIcon}
          type="outlined"
          header="Powerup"
        />
      </div>
      {isCloseAnswer ? <BlueOverlayModal innerText={closeAnswered()} /> : <></>}
      {isCorrectAnswer ? (
        <BlueOverlayModal innerText={correctAnswered()} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Question;
