import React, { useState } from "react";
import "./Feedback.styles.css";
import { useHistory } from "react-router-dom";
import {
  TextField,
  makeStyles,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import { SubmitFeedback } from "../../api/feedback";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#0fa3b1",
    fontFamily: "Mulish",
    "& .MuiFormLabel-root": {
      color: "#0FA3B1",
    },
    "& .MuiInputLabel-root": {
      // color: "white",
    },
    "& .MuiInputBase-input": {
      color: "#d08123",
    },
    "& .MuiFormHelperText-root": {
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
        borderColor: "#ffd37c",
      },
      "&:hover fieldset": {
        borderColor: "#dda158",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffd37c",
      },
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiSelect-select:not([multiple]) option": {
      backgroundColor: "black",
    },
    "&.Mui-checked": {
      color: "#0fa3b1",
    },
  },
  title: {
    color: "#d08123",
    fontFamily: "Cinzel",
    fontWeight: "bold",
    fontSize: "2rem",
    lineHeight: "48px",
    margin: "4vh 3vw 0 3vw",
  },
  subtext: {
    color: "#0FA3B1",
    padding: "2% 10%",
    fontFamily: "Mulish",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "16px",
  },
  goldenBtn: {
    color: "#d08123",
    fontFamily: "Mulish",
    margin: "5vh auto 6vh auto",
  },
}));

const Feedback = () => {
  const [VITIAN, setVITIAN] = useState(false);
  const history = useHistory();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [data, setData] = useState({
    isVITStudent: "",
    gameRating: "",
    userExperience: "",
    featureIdeas: "",
    vitEmail: "",
    regNo: "",
  });
  const [validateData, setValidateData] = useState({});

  const handleInputChange = (e) => {
    if (e.target.value === "true") {
      setVITIAN(true);
    } else if (e.target.value === "false") {
      setVITIAN(false);
    }
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validate = () => {
    const temp = {};
    temp.isVITStudent = data.isVITStudent ? "" : "Required";
    temp.gameRating = data.gameRating ? "" : "Required";
    temp.userExperience = data.userExperience ? "" : "Required";
    temp.featureIdeas = data.featureIdeas ? "" : "Required";
    if (data.isVITStudent === "true") {
      temp.vitEmail = data.vitEmail ? "" : "Required";
      temp.regNo = data.regNo ? "" : "Required";
    } else {
      temp.vitEmail = "";
      temp.regNo = "";
    }
    setValidateData({ ...temp });
  };

  const handleOnSubmit = () => {
    validate();
    setIsSubmitLoading(true);
    const vitStatus = data.isVITStudent === "yes";
    const gameStatus = Number(data.gameRating);
    SubmitFeedback(
      vitStatus,
      gameStatus,
      data.userExperience,
      data.featureIdeas,
      data.regNo,
      data.vitEmail
    )
      .then(() => {
        setIsSubmitLoading(false);
        history.push({ pathname: "/rooms" });
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitLoading(false);
      });
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleOnSubmit();
    }
  };

  const classes = useStyles();

  const QuestionContainer = (questionLabel, type, error) => {
    return (
      <div>
        <div className="feedback-question ">{questionLabel}</div>
        <TextField
          id={type}
          label=""
          name={type}
          variant="outlined"
          required
          className={`feedback-text-field ${classes.root}`}
          error={error}
          helperText={error}
          onChange={handleInputChange}
          onKeyDown={onEnter}
          style={{
            color: "#FFD37C",
            margin: "1vh 0",
          }}
        />
      </div>
    );
  };

  return (
    <div className={`${classes.root} feedback-container`}>
      <div className="feedback-heading">
        <div className={`${classes.title} feedback-title`}>FEEDBACK FORM</div>
        <div className={`${classes.subtext} feedback-subtitle`}>
          Your feedback makes us better
        </div>
      </div>
      <div className="feedback-rows-container">
        <div className="feedback-row feedback-row-1">
          <div className="feedback-question ">
            Q1. Are you a student from VIT
          </div>
          <RadioGroup
            row
            aria-label="gender"
            name="isVITStudent"
            className="feedback-radiogroup"
            onChange={handleInputChange}
            error={validateData.isVITStudent}
            helperText={validateData.isVITStudent}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="yes"
              className="feedback-radiogroup-item"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="no"
              className="feedback-radiogroup-item"
            />
            <FormHelperText>{validateData.isVITStudent}</FormHelperText>
          </RadioGroup>
        </div>
        {VITIAN ? (
          <div className="feedback-row feedback-row-2">
            {QuestionContainer(
              "Enter your Registeration number",
              "regNo",
              validateData.regNo
            )}
            {QuestionContainer(
              "Enter your VIT email id",
              "vitEmail",
              validateData.vitEmail
            )}
          </div>
        ) : (
          ""
        )}

        <div className="feedback-row feedback-row-3">
          <div className="feedback-question ">
            <div className="feedback-question ">
              Q2. On a scale of 1-5, how would you rate the game?
            </div>
          </div>

          <RadioGroup
            row
            aria-label="gameRating"
            name="gameRating"
            className="feedback-radiogroup"
            onChange={handleInputChange}
            error={validateData.gameRating}
            helperText={validateData.gameRating}
          >
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
            <FormHelperText> {validateData.gameRating}</FormHelperText>
          </RadioGroup>
        </div>

        <div className="feedback-row feedback-row-4">
          {QuestionContainer(
            "Q3. How was your user experience during the game?",
            "userExperience",
            validateData.userExperience
          )}
        </div>
        <div className="feedback-row feedback-row-4">
          {QuestionContainer(
            "Q4. Anything you would like to add for the upcoming enigma?",
            "featureIdeas",
            validateData.featureIdeas
          )}
        </div>
      </div>

      <br />
      {isSubmitLoading ? (
        <CircularProgress />
      ) : (
        <GoldenBtn
          marginTop="0p"
          width="148px"
          triggerFunction={handleOnSubmit}
        >
          Submit
        </GoldenBtn>
      )}
    </div>
  );
};

export default Feedback;
