import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { createProfile } from "../../api/user";

const Welcome = () => {
  const [, setCookies] = useCookies(["newUser"]);
  const history = useHistory();
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
      value: "Instagram",
      label: "Instagram",
    },
    {
      value: "Facebook",
      label: "Facebook",
    },
    {
      value: "Twitter",
      label: "Twitter",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];
  return (
    <div>
      <div>Woohoo! you have Successfully signed in</div>
      <br />
      <TextField
        id="username"
        label="Enter Username"
        name="username"
        variant="outlined"
        required
        error={validateData.username}
        helperText={validateData.usernameHelper}
        onChange={addData}
        style={{
          marginBottom: "25px",
          width: "50%",
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
          width: "50%",
        }}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        required
        error={validateData.outreach}
        helperText={validateData.outreachHelper}
      >
        <option value="empty" disabled>
          --Select Your Option---
        </option>
        {outreach.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      <br />
      <button type="submit" onClick={sendData}>
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
