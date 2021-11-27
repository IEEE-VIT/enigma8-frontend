import React, { useState } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Close from "../../assets/CloseGold.svg";
import "./Instructions.styles.css";
import ListIcon from "../../assets/instructions/list-icon.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "70%",
    backgroundColor: "#000",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "80%",
    overflowY: "auto",
  },
  instructions: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    fontFamily: "Cinzel",
    marginBottom: "25px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "25px",
  },
  button: {
    fontFamily: "Mulish",
    fontWeight: "700",
    fontSize: "18px",
    background: "none",
    border: "none",
    paddingBottom: "3px",
    color: "#0fa3b1",
  },
}));

const Instructions = ({ handleClose, openInstructions }) => {
  const classes = useStyles();
  const [modalStyle] = useState({ top: "10%", left: "10%" });
  const instructions = {
    gameMechanics: [
      "Enigma 8 is an online cryptic hunt where players solve exciting riddles and puzzles to win amazing prizes.",
      "There are eight rooms in total and each room has three questions.",
      "On solving a question, the player will receive a key.",
      "A particular amount of keys are required to unlock a room.",
      "Solve every question to be the first one to solve Enigma.",
    ],
    scoringSystem: [
      "Upon solving a question, a player shall receive a particular amount of points relative to the competition - the earlier you solve a question, the higher your score will be. These points determine your position on the leaderboard.",
      "Upon using a hint, X points will be deducted from the score earned on solving that particular question.",
    ],
    roomStates: [
      "A room can either be locked, unlocked, or solved.",
      "A room is locked when the player does not have the minimum amount of keys to unlock it else if the player hasn’t yet chosen a powerup for that room.",
      "A room is unlocked when the player has sufficient keys and has chosen a powerup for that room.",
      "A room is solved only when a player solves all three questions in that room.",
    ],
    powerups: [
      "Every player gets eight power ups at the start of the game.",
      "Before a player enters the room, they have to choose a powerup and the powerup chosen can only be used in that particular room.",
      "Only one powerup can be chosen per room and can only be used  only for one question in that room.",
      "No points will be deducted for using a powerup.",
      "Each powerup can be used only once, during the entire game.",
    ],
    miscellaneous: [
      "To smoothen your experience during Enigma, please enable the notifications for this app/website to receive important updates.",
      "Malpractice in any form will be dealt with seriously. Players are requested to report us of any such practices.",
      "Enigma is an individual player game and the players are requested to maintain the integrity of the game and not to divulge the solutions anywhere..",
      "Only VITians who joined VIT in 2021 are eligible for Best Fresher's prize.",
      "In case of any disputes, IEEE-VIT reserves the right of the final decision.",
    ],
  };
  const [instructionContent, setInstructionContent] = useState(
    instructions.gameMechanics
  );
  const displayInstructions = instructionContent.map((instruction) => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "8px", marginRight: "8px" }}>
          <img src={ListIcon} alt="" />
        </div>
        <div
          style={{
            borderRadius: "12px",
            border: "2px solid #D08123",
            marginBottom: "17px",
            fontFamily: "Mulish",
            fontSize: "16px",
            padding: "13px 30px",
            width: "100%",
          }}
        >
          {instruction}
        </div>
      </div>
    );
  });
  const setGameMechanics = () => {
    setInstructionContent(instructions.gameMechanics);
  };
  const setScoringSystem = () => {
    setInstructionContent(instructions.scoringSystem);
  };
  const setRoomStates = () => {
    setInstructionContent(instructions.roomStates);
  };
  const setPowerups = () => {
    setInstructionContent(instructions.powerups);
  };
  const setMiscellaneous = () => {
    setInstructionContent(instructions.miscellaneous);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ width: "100%", textAlign: "right" }}>
        <button
          type="button"
          onClick={handleClose}
          style={{
            background: "none",
            border: "none",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            padding: "0",
          }}
        >
          <img
            src={Close}
            style={{
              height: 25,
              cursor: "url(../../assets/PointerCursor.svg), auto !important",
            }}
            alt=""
          />
        </button>
      </div>
      <div className={classes.instructions}>Instructions</div>
      <div className={classes.buttons}>
        <button
          type="button"
          className={`${classes.button} cursor-pointer`}
          onClick={setGameMechanics}
          style={
            instructionContent[0] === instructions.gameMechanics[0]
              ? { borderBottom: "2px solid #D08123" }
              : {}
          }
        >
          Game Mechanics
        </button>
        <button
          type="button"
          className={`${classes.button} cursor-pointer`}
          onClick={setScoringSystem}
          style={
            instructionContent[0] === instructions.scoringSystem[0]
              ? { borderBottom: "2px solid #D08123" }
              : {}
          }
        >
          Scoring System
        </button>
        <button
          type="button"
          className={`${classes.button} cursor-pointer`}
          onClick={setRoomStates}
          style={
            instructionContent[0] === instructions.roomStates[0]
              ? { borderBottom: "2px solid #D08123" }
              : {}
          }
        >
          Room States
        </button>
        <button
          type="button"
          className={`${classes.button} cursor-pointer`}
          onClick={setPowerups}
          style={
            instructionContent[0] === instructions.powerups[0]
              ? { borderBottom: "2px solid #D08123" }
              : {}
          }
        >
          Powerups
        </button>
        <button
          type="button"
          className={`${classes.button} cursor-pointer`}
          onClick={setMiscellaneous}
          style={
            instructionContent[0] === instructions.miscellaneous[0]
              ? { borderBottom: "2px solid #D08123" }
              : {}
          }
        >
          Miscellaneous
        </button>
      </div>
      <div>
        <div className="instructions-list">{displayInstructions}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={openInstructions}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

Instructions.propTypes = {
  openInstructions: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Instructions;
