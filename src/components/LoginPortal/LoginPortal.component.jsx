import React, { useEffect } from "react";
import "./LoginPortal.styles.css";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import GoogleIcon from "../../assets/home/googleIcon.svg";

const LoginPortal = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const newUser = cookies.get("newUser");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/countdown");
    }
    if (token && newUser === "true") {
      history.push("/welcome");
    }
  }, [token, newUser]);
  const GoogleAuthRedirect = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/web/google`;
    window.open(url, "_self");
  };
  return (
    <div id="login">
      <div className="login">
        <button
          className="login-btn"
          type="button"
          onClick={GoogleAuthRedirect}
        >
          <img className="google-icon" src={GoogleIcon} alt="" />
          <span className="login-inner-text"> Continue with Google</span>
        </button>

        {/* <button
          className="login-button google-login-button"
          type="button"
          disabled
        >
          Continue with Apple
        </button> */}
      </div>
    </div>
  );
};

export default LoginPortal;
