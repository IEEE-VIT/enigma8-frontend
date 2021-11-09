import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import getQuestion from "../../api/Question";
import ModalContainer from "../../components/CustomModal/ModalContainer/ModalContainer.component";
import NestedModal from "../../components/CustomModal/NestedModal/NestedModal.component";
// import PowerUpPlus from "../../assets/powerup-plus.svg";
import "./Question.styles.css";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [questionNum, setQuestionNum] = useState(1);
  const [media, setMedia] = useState("");
  const [isHint, setIsHint] = useState(false);
  const [hint, getHint] = useState("");
  const [isPowerUp, setIsPowerUp] = useState(false);
  const [powerUp, getPowerUp] = useState("");
  const location = useLocation();
  const { roomId, roomNo } = location.state;
  const history = useHistory();
  const goBack = () => {
    history.push({
      pathname: "/rooms",
    });
  };

  useEffect(() => {
    getQuestion(roomId)
      .then((res) => {
        const info = res.data.data;
        setQuestion(info.text);
        setQuestionNum(info.questionNo);
        setMedia(info.media);
        // The route should also give this
        // PowerUp's name
        getPowerUp("Hangman");
        // Are hint and powerUp used
        setIsPowerUp(false);
        setIsHint(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleHint = () => {
    getHint("Hint: Never gonna give you up!");
    // POST route: update Hint used
    setIsHint(true);
  };
  const HintModal = () => {
    const PreHintText = "If you use hint, then your points will be reduced.";
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

  const handlePowerUp = () => {
    // POST route: update PowerUp used
    setIsPowerUp(true);
  };
  const PowerUpModal = () => {
    const PrePowerUpText = `This powerup can be used only once in this room. Are you sure you want to use ' ${powerUp} ' powerup for this question?.`;
    const PostPowerUpText = "You have claimed the powerup!";
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

          <div className="question-section-1-hinttext">{hint}</div>
          <div className="question-section-1-text">Room {roomNo}</div>
        </div>
        <div className="question-section-2">
          <div className="question-section-2-media">
            Image goes here
            <img src={media} alt="" />
          </div>
          <div className="question-section-2-answerfield">
            {" "}
            <TextField
              id="answer"
              label="Enter Answer"
              name="answer"
              variant="outlined"
              required
              // error={}
              // helperText={}
              // onChange={}
            />
          </div>
          <div className="question-section-2-Btn">
            <ModalContainer innerText={HintModal()} openText="Hint" />
            <button type="submit" className="question-section-2-SubmitBtn">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="powerup">
        <ModalContainer innerText={PowerUpModal()} openText="PowerUp" />
      </div>
    </div>
  );
};

export default Question;
