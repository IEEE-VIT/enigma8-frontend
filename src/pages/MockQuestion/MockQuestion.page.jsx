import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ModalContainer from "../../components/CustomModal/ModalContainer/ModalContainer.component";
import NestedModal from "../../components/CustomModal/NestedModal/NestedModal.component";
import { timer } from "../../api/timer";
import OverlayModal from "../../components/CustomModal/OverlayModal/OverlayModal.component";
import "./MockQuestion.styles.css";

const MockQuestion = () => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [is420, setIs420] = useState(false);
  const [remTime, setRemTime] = useState(0);
  const [wrongSystemTime, setWrongSystemTime] = useState(false);
  const getRemTime = () => {
    timer()
      .then(async (res) => {
        if (
          Math.floor((new Date("2021-11-26T16:20") - new Date()) / 10000) !==
          Math.floor(res.data.data.date / 10)
        ) {
          setWrongSystemTime(true);
        }
        setRemTime(res.data.data.date);
        setIs420(res.data.data.enigmaStarted);
        console.log(is420, remTime, wrongSystemTime);
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
    await setAnswer(value);
  };
  useEffect(getRemTime, []);
  useEffect(updateRemTime, [remTime]);
  const question = "This is my question for you!";
  const media =
    "https://res.cloudinary.com/practicaldev/image/fetch/s--MogK4afM--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/w6nrrg4yw4vnux9dhhoq.png";
  const [isHint, setIsHint] = useState(false);
  const [hint, getHint] = useState("");
  const history = useHistory();
  const goBack = () => {
    history.push({
      pathname: "/countdown",
    });
  };

  const handleHint = () => {
    getHint("Hint: Never gonna give you up!");
    // POST route: update Hint used
    setIsHint(true);
  };
  const HintModal = () => {
    const PreHintText = "Are you sure, do you want to use a hint?";
    const PostHintText = `${hint}`;
    return (
      <NestedModal
        stateValue={isHint}
        PreMessage={PreHintText}
        ButtonText=" Use Hint"
        triggerFunction={handleHint}
        PostMessage={PostHintText}
      />
    );
  };
  const submitAnswer = () => {
    if (answer === "Shubhu") {
      setIsCorrect(true);
    }
  };
  const successfullyAnswered = () => {
    return (
      <div>
        <h1>You are correct!</h1>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </div>
    );
  };
  return (
    <div>
      <h1>Mock Question</h1>
      {is420 ? <OverlayModal innerText="Hey! Let's go play Enigma!" /> : <> </>}
      <div>
        <div className="mock-question-container">
          <div className="mock-question-section-1">
            <div className="mock-question-section-1-backBtn">
              <button type="button" onClick={goBack}>
                Back
              </button>
            </div>
            <div className="mock-question-section-1-question">
              <div className="mock-question-section-1-text">
                Question: {question}
              </div>
            </div>

            <div className="mock-question-section-1-hinttext">{hint}</div>
          </div>
          <div className="mock-question-section-2">
            <div className="mock-question-section-2-media">
              <img src={media} alt="" />
            </div>
            <div className="mock-question-section-2-answerfield">
              {" "}
              <TextField
                id="answer"
                label="Enter Answer"
                name="answer"
                variant="outlined"
                required
                // error={}
                // helperText={}
                onChange={addAnswer}
              />
            </div>
            <div className="mock-question-section-2-Btn">
              <ModalContainer innerText={HintModal()} openText="Hint" />
              <button
                type="submit"
                className="mock-question-section-2-SubmitBtn"
                onClick={submitAnswer}
              >
                Submit
              </button>
              {isCorrect ? (
                <OverlayModal innerText={successfullyAnswered()} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MockQuestion;
