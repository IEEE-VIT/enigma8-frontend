import React, { useEffect } from "react";
import "./LoginPortal.styles.css";
import { Cookies, useCookies } from "react-cookie";
import AppleSignin from "react-apple-signin-auth";
import { useHistory } from "react-router-dom";
import { signInWithApple } from "../../api/user";
import GoogleIcon from "../../assets/home/googleIcon.svg";
import AppleIcon from "../../assets/home/appleIcon.svg";

const LoginPortal = () => {
  const [, setCookies] = useCookies(["token", "newUser"]);
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

  const AppleAuthRedirect = (response) => {
    signInWithApple(response.authorization.id_token)
      .then((res) => {
        setCookies("token", res.data.data.JWT);
        setCookies("newUser", res.data.data.isNew);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <span className="login-inner-text"> Sign in With Google</span>
        </button>

        <AppleSignin
          authOptions={{
            clientId: process.env.REACT_APP_CLIENT_ID,
            scope: "email name",
            redirectURI: process.env.REACT_APP_REDIRECT_URI,
            state: "",
            nonce: "nonce",
            usePopup: true,
          }}
          uiType="dark"
          className="apple-auth-btn"
          buttonExtraChildren="Continue with Apple"
          onSuccess={AppleAuthRedirect}
          onError={(error) => {
            console.error(error);
          }}
          render={(props) => (
            // eslint-disable-next-line
            <button type="button" className="login-btn" {...props}>
              <img className="apple-icon" src={AppleIcon} alt="" />
              <span className="login-inner-text"> Sign in With Apple</span>
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default LoginPortal;
