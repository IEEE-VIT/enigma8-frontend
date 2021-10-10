import React, { useEffect } from "react";
import "./LoginPortal.styles.css";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const LoginPortal = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const newUser = cookies.get("newUser");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push("/countdown");
    }
    if (token && newUser) {
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
          className="login-button google-login-button"
          type="button"
          onClick={GoogleAuthRedirect}
        >
          Continue with Google
        </button>
        <button
          className="login-button google-login-button"
          type="button"
          disabled
        >
          Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default LoginPortal;
