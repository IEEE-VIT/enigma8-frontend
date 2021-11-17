import React, { useState, useEffect } from "react";
import "./Welcome.styles.css";
import {
  TextField,
  Paper,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { createProfile } from "../../api/user";
import LeftHanger from "../../assets/welcome/welcome-left.svg";
import RightHanger from "../../assets/welcome/welcome-right.svg";
import GoldenBtn from "../../components/CustomButton/Golden/GoldenBtn.component";

const useStyles = makeStyles((theme) => ({
  root: {
    // color: theme.palette.primary.main,
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    fontFamily: "Mulish",
  },
  paperContainer: {
    // backgroundImage: `url(${Background})`,
    height: "100%",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (min-width:1280px)": {
      "& .MuiContainer-maxWidthLg": {
        maxWidth: "4000px",
      },
    },
  },
  paper: {
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    padding: "1% 2% 0 2%",
    backgroundColor: theme.palette.secondary.main,
    border: "2px solid #D08123",
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
  title: {
    // color: theme.palette.primary.main,
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    backgroundColor: theme.palette.secondary.main,
    fontFamily: "Cinzel",
    fontWeight: "bold",
    fontSize: "2rem",
    lineHeight: "48px",
    margin: "4vh 3vw",
  },
  subtext: {
    padding: "2% 10%",
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    fontFamily: "Mulish",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "16px",
  },
  goldenBtn: {
    // backgroundImage: "linear-gradient(to bottom, #ffd37c 0%, #d08123 100%)",
    // background: "-webkit-linear-gradient(#FFD37C, #D08123)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    color: "#d08123",
    fontFamily: "Mulish",
    margin: "5vh auto 6vh auto",
  },
}));

const Welcome = () => {
  const [cookies, setCookies] = useCookies(["newUser"]);
  const history = useHistory();
  useEffect(() => {
    if (cookies.newUser === "false") {
      history.push("/countdown");
    }
  }, []);

  const [data, setData] = useState({
    username: "",
    outreach: "",
  });
  const [validateData, setValidateData] = useState({});
  const addData = async (e) => {
    const { name, value } = e.target;
    await setData({
      ...data,
      [name]: value,
    });
  };

  const vaildate = () => {
    if (data.username.trim() === "") {
      validateData.username = true;
      validateData.usernameHelper = "Username cannot be empty.";
    } else if (!/^[a-zA-Z0-9]+$/.test(data.username)) {
      validateData.username = true;
      validateData.usernameHelper =
        "Sorry, only alphanumeric characters are allowed.";
    } else if (data.username.length < 3 || data.username.length > 30) {
      validateData.username = true;
      validateData.usernameHelper =
        "Sorry, your username must be betweeen 3 and 30 characters long.";
    } else {
      validateData.username = false;
      validateData.usernameHelper = "";
    }
    if (!data.outreach) {
      validateData.outreach = true;
      validateData.outreachHelper = "Please select an appropriate option.";
    } else {
      validateData.outreach = false;
      validateData.outreachHelper = "";
    }
    setValidateData({ ...validateData });
  };
  const sendData = () => {
    vaildate();
    if (!validateData.username && !validateData.outreach) {
      createProfile(data.username, data.outreach)
        .then(() => {
          setCookies("newUser", false);
          history.push("/countdown");
        })
        .catch((err) => {
          console.log(err.response.data);
          if (
            Object.prototype.hasOwnProperty.call(err.response.data, "message")
          ) {
            if (err.response.data.message === "username not unique") {
              validateData.username = true;
              validateData.usernameHelper =
                "Sorry, this username isn't available.";
            } else if (
              err.response.data.message ===
              "Username for this email is already set. It cannot be updated"
            ) {
              validateData.username = true;
              validateData.usernameHelper =
                "Username for this email is already set. It cannot be updated.";
            } else if (
              err.response.data.message ===
              `"username" must only contain alpha-numeric characters`
            ) {
              validateData.username = true;
              validateData.usernameHelper =
                "Username must only contain alpha-numeric characters.";
            } else if (
              err.response.data.message ===
              `"username" is not allowed to be empty`
            ) {
              validateData.username = true;
              validateData.usernameHelper = "Username cannot be empty.";
            }
            if (
              err.response.data.message ===
              `"outreach" is not allowed to be empty`
            ) {
              validateData.outreach = true;
              validateData.outreachHelper =
                "Please select an appropriate option.";
            }
            setValidateData({ ...validateData });
          }
        });
    }
  };
  const outreach = [
    {
      value: "instagram",
      label: "Instagram",
    },
    {
      value: "facebook",
      label: "Facebook",
    },
    {
      value: "reddit",
      label: "Reddit",
    },
    {
      value: "linkedin",
      label: "LinkedIn",
    },
    {
      value: "discord",
      label: "Discord",
    },
    {
      value: "word of mouth",
      label: "Word Of Mouth",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const classes = useStyles();
  return (
    <Container
      className={`welcome-container ${classes.paperContainer}`}
      maxWidth={false}
    >
      <Paper className={`welcome-paper-container ${classes.paper}`}>
        <img src={LeftHanger} className="welcome-lefthanger" alt="" />
        <img src={RightHanger} className="welcome-righthanger" alt="" />
        <Typography className={classes.title} variant="h5">
          CREATE PROFILE
        </Typography>
        <Typography className={classes.subtext} variant="subtitle1">
          You have successfully signed in! Register yourself to continue!
        </Typography>
        <br />
        <TextField
          id="username"
          label="Enter Username"
          name="username"
          variant="outlined"
          required
          className={`text-field ${classes.root}`}
          error={validateData.username}
          helperText={validateData.usernameHelper}
          onChange={addData}
          style={{
            marginBottom: "25px",
            color: "#ffd37c",
          }}
        />
        <br />
        <TextField
          id="outreach"
          name="outreach"
          select
          defaultValue="empty"
          label="Where did you hear about us?"
          onChange={addData}
          style={{
            marginBottom: "25px",
          }}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          required
          className="text-field"
          error={validateData.outreach}
          helperText={validateData.outreachHelper}
        >
          <option value="empty" disabled className={classes.root}>
            --Select Your Option---
          </option>
          {outreach.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={classes.root}
            >
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
        <GoldenBtn marginTop="0p" width="148px" triggerFunction={sendData}>
          Get Started
        </GoldenBtn>
      </Paper>
    </Container>
  );
};

export default Welcome;
