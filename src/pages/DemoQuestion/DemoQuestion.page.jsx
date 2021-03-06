import React, { useState, useEffect } from "react";
import { TextField, makeStyles, Paper, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ModalContainer from "../../components/CustomModal/ModalContainer/ModalContainer.component";
import { timer } from "../../api/timer";
import OverlayModal from "../../components/CustomModal/OverlayModal/OverlayModal.component";
import BlueOverlayModal from "../../components/CustomModal/BlueOverlayModal/BlueOverlayModal.component";
import "./DemoQuestion.styles.css";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";
import BlueBtn from "../../components/CustomButton/Blue/BlueBtn.component";
import ScarabBeetleL from "../../assets/mockquestion/ScarabBeetleL.svg";
import ScarabBeetleR from "../../assets/mockquestion/ScarabBeetleR.svg";
import Back from "../../assets/mockquestion/back.svg";

const useStyles = makeStyles((theme) => ({
  scarab: {
    position: "absolute",
    top: "30%",
    height: "50%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  MockQuestionImg: {
    width: "500px",
    height: "200px",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
      height: "45vw",
    },
  },
  root: {
    // color: theme.palette.primary.main,
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    fontFamily: "Mulish",
  },
  paper: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
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
      width: "40vw",
      [theme.breakpoints.down("md")]: {
        width: "80vw",
      },
    },
  },
  paperContainer: {
    height: "100%",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  MockQuestion: {
    color: "#d08123",
    fontFamily: "Mulish",
  },
  MockQuestionHeader: {
    fontFamily: "Mulish",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  MockQuestionContainer: {
    marginTop: "24px",
  },
  back: {
    marginLeft: "91px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "18px ",
      height: "36px",
    },
  },
}));

const DemoQuestion = () => {
  const [validateData, setValidateData] = useState({});
  const classes = useStyles();
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isCloseAnswer, setIsCloseAnswer] = useState(false);
  const [is420, setIs420] = useState(false);
  const [remTime, setRemTime] = useState(0);
  const getRemTime = () => {
    timer()
      .then(async (res) => {
        setRemTime(res.data.data.date);
        setIs420(res.data.data.enigmaStarted);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const decrementTime = () => {
    setRemTime(remTime - 1);
  };
  const updateRemTime = () => {
    if (remTime !== 0) {
      setTimeout(decrementTime, 1000);
    } else if (remTime === 0) {
      getRemTime();
    }
  };
  const addAnswer = async (e) => {
    const { value } = e.target;
    validateData.answer = false;
    validateData.answerHelper = "";
    setValidateData({ ...validateData });
    await setAnswer(value);
  };
  useEffect(getRemTime, []);
  useEffect(updateRemTime, [remTime]);
  const question = () => {
    return (
      <div className="mockquestion-heading">
        <div style={{ fontSize: 30 }}>Demo Question</div>
        Where lived the man? <br /> <i>Et tu, Brute?</i>
      </div>
    );
  };
  const media = "https://i.ibb.co/K2wjjb3/Mock-Question.jpg";
  const history = useHistory();
  const goBack = () => {
    history.push({
      pathname: "/countdown",
    });
  };

  const HintModal = () => {
    const Hint = "Caeser Cipher with Key 5";
    return <div>{Hint}</div>;
  };
  const submitAnswer = () => {
    if (answer.trim().toLowerCase() === "denmark") {
      setIsCorrect(true);
      validateData.answer = false;
      validateData.answerHelper = "";
    } else if (answer.trim().toLowerCase() === "norway") {
      setIsCorrect(true);
      validateData.answer = false;
      validateData.answerHelper = "";
    } else if (answer.trim().toLowerCase() === "harald") {
      setIsCloseAnswer(true);
      validateData.answer = true;
      validateData.answerHelper = "Wrong Answer. Keep Trying!";
    } else if (answer.trim().toLowerCase() === "bluetooth") {
      setIsCloseAnswer(true);
      validateData.answer = true;
      validateData.answerHelper = "Wrong Answer. Keep Trying!";
    } else {
      validateData.answer = true;
      validateData.answerHelper = "Wrong Answer. Keep Trying!";
    }

    setValidateData({ ...validateData });
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      submitAnswer();
    }
  };

  const successfullyAnswered = () => {
    return (
      <div>
        <h4 style={{ marginBottom: 30, marginTop: 0 }}>
          Amazing work! You solved the question. But will you be able to solve
          the actual game? Let???s see
        </h4>
        <BlueBtn triggerFunction={goBack} marginTop="0" width="280.74px">
          Go Back to Timer Screen
        </BlueBtn>
      </div>
    );
  };
  const closeCloseAnswered = () => {
    setIsCloseAnswer(false);
    validateData.answer = false;
    validateData.answerHelper = "";
    setValidateData({ ...validateData });
  };
  const closeAnswered = () => {
    return (
      <div>
        <h4 style={{ marginBottom: 30, marginTop: 0 }}>
          That was a close answer. Keep trying!
        </h4>
        <BlueBtn
          triggerFunction={closeCloseAnswered}
          marginTop="0"
          width="150.74px"
        >
          Try Again
        </BlueBtn>
      </div>
    );
  };
  return (
    <div>
      {is420 ? <OverlayModal innerText="Hey! Let's go play Enigma!" /> : <> </>}
      <div>
        <div
          className={`mock-question-container ${classes.MockQuestionContainer}`}
        >
          <div className="mock-question-back" style={{ textAlign: "left" }}>
            <button
              type="button"
              className="cursor-pointer"
              style={{
                background: "none",
                border: "none",
              }}
              onClick={goBack}
            >
              <img src={Back} className={classes.back} alt="" />
            </button>
          </div>
          <div className="mock-question-section-1">
            <div
              className={`mock-question-section-1-text ${classes.MockQuestion}`}
            >
              {question()}
            </div>
          </div>
          <div className="mock-question-section-2">
            <div
              className={`mock-question-section-2-media mock-question-section-2-inner ${classes.MockQuestion}`}
            >
              <img className={classes.MockQuestionImg} src={media} alt="" />
              <br />
              rfs gjmnsi gqzj yttym
            </div>
            <div className="mock-question-section-2-answerfield mock-question-section-2-inner">
              <Container
                className={`${classes.paperContainer}`}
                maxWidth={false}
              >
                <Paper className={`${classes.paper}`}>
                  <TextField
                    className={classes.root}
                    id="answer"
                    label="Enter Answer"
                    name="answer"
                    variant="outlined"
                    required
                    error={validateData.answer}
                    helperText={validateData.answerHelper}
                    onChange={addAnswer}
                    onKeyDown={onEnter}
                  />
                </Paper>
              </Container>
            </div>
            <div className="mock-question-section-2-btns-container mock-question-section-2-inner">
              <div>
                <ModalContainer
                  innerText={HintModal()}
                  openText="Use Hint"
                  type="outlined"
                  header="HINT"
                />
              </div>
              <div style={{ marginLeft: 40 }}>
                <GoldenBtn
                  triggerFunction={submitAnswer}
                  marginTop="0px"
                  width="117px"
                >
                  Submit
                </GoldenBtn>
              </div>
              {isCorrect ? (
                <BlueOverlayModal innerText={successfullyAnswered()} />
              ) : (
                <></>
              )}
              {isCloseAnswer ? (
                <BlueOverlayModal innerText={closeAnswered()} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={ScarabBeetleL}
        className={`scarab-beetle-left ${classes.scarab}`}
        alt=""
      />
      <img
        src={ScarabBeetleR}
        className={`scarab-beetle-right ${classes.scarab}`}
        alt=""
      />
    </div>
  );
};
export default DemoQuestion;
