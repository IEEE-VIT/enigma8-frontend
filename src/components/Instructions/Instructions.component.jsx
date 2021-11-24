import React, { useState } from "react";
import { Modal, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import "./Instructions.styles.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "80%",
    overflowY: "auto",
  },
}));

const Instructions = ({ handleClose, openInstructions }) => {
  const classes = useStyles();
  const [modalStyle] = useState({ top: "10%", left: "10%" });
  const instructions = {
    gameMechanics: ["Game Mechanics", "These are the rules"],
    scoringSystem: ["Scoring System", "These are the rules"],
    roomStates: ["Room States", "These are the rules"],
    powerups: ["Powerups", "These are the rules"],
    miscelannous: ["Miscelannous", "These are the rules"],
  };
  const [instructionContent, setInstructionContent] = useState(
    instructions.gameMechanics
  );
  const displayInstructions = instructionContent.map((instruction) => {
    return (
      <div>
        <h3>{instruction}</h3>
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
  const setMiscelannous = () => {
    setInstructionContent(instructions.miscelannous);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <button type="button" onClick={setGameMechanics}>
        Game Mechanics
      </button>
      <button type="button" onClick={setScoringSystem}>
        Scoring System
      </button>
      <button type="button" onClick={setRoomStates}>
        Room States
      </button>
      <button type="button" onClick={setPowerups}>
        Powerups
      </button>
      <button type="button" onClick={setMiscelannous}>
        Miscelannous
      </button>
      <div>{displayInstructions}</div>
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
