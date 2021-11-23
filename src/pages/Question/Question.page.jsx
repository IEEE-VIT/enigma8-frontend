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
import BlueOverlayModal from "../../components/CustomModal/BlueOverlayModal/BlueOverlayModal.component";
import BlueBtn from "../../components/CustomButton/Blue/BlueBtn.component";
import NestedModal from "../../components/CustomModal/NestedModal/NestedModal.component";
import "./Question.styles.css";

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
    "& .MuiFormLabel-root": {
      // color: theme.palette.primary.main,
      // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
      // WebkitBackgroundClip: "text",
      // WebkitTextFillColor: "transparent",
      color: "#d08123",
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
  const location = useLocation();
  const { roomId, roomNo } = location.state;
  const [questionNum, setQuestionNum] = useState();
  // const [nextRoomId, setNextRoomId] = useState(roomId);
  const history = useHistory();
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
        console.log(info);
        setQuestion(info.question.text);
        setQuestionNum(info.question.questionNo);
        setMedia(info.question.media);
        setMediaType(info.question.mediaType);
        if (info.hint !== null) {
          setIsHint(true);
          setHint(info.hint);
        }
        if (info.powerupUsed === "active") {
          setIsPowerUp(true);
          handlePowerUp();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closeCorrectAnswer = () => {
    console.log(nextRoomUnlocked);
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
        console.log(res.data.data);
        setIsCloseAnswer(res.data.data.closeAnswer);
        setIsCorrectAnswer(res.data.data.correctAnswer);
        if (!res.data.data.correctAnswer) {
          wrongAnswer.status = !res.data.data.correctAnswer;
          wrongAnswer.helper = "Keep trying!";
          setWrongAnswer({ ...wrongAnswer });
        }
        setNextRoomUnlocked(res.data.data.nextRoomUnlocked);
        // if (res.data.data.nextRoomId !== null) {
        //   setNextRoomId(res.data.data.nextRoomId);
        // } else {
        //   setNextRoomId(roomId);
        // }
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
    // POST route: update Hint used
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
    const PrePowerUpText = `This powerup can be used only once in this room. Are you sure you want to use ' ${powerUp} ' powerup for this question?.`;
    const PostPowerUpText = `${powerUp}`;
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
    <div>
      <div className="question-container">
        <div className="question-section-1">
          <div className="question-section-1-backBtn">
            <button type="button" onClick={goBack}>
              Back
            </button>
          </div>
          <div className="question-section-1-question">
            <div className="question-section-1-questionNo">
              Q. {questionNum}
            </div>
            <div className="question-section-1-text">Question: {question}</div>
          </div>

          <div className="question-section-1-hinttext">Hint: {hint}</div>
          <div className="question-section-1-text">Room {roomNo}</div>
        </div>
        <div className="question-section-2">
          <div className="question-section-2-media">
            {mediaType === "image/png" ? (
              <img style={{ height: 300, width: 300 }} src={media} alt="" />
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
          <div className="question-section-2-Btn">
            <ModalContainer
              innerText={HintModal()}
              openText="Hint"
              type="outlined"
              header="HINT"
            />
            <button
              type="submit"
              className="question-section-2-SubmitBtn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="powerup">
        <ModalContainer
          innerText={PowerUpModal()}
          openText="PowerUp"
          type="outlined"
          header="HINT"
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
