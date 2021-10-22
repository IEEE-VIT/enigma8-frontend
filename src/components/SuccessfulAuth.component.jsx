import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [, setCookies] = useCookies(["token", "newUser"]);
  const history = useHistory();

  const redirectChecker = (newUser) => {
    if (newUser === "true") {
      history.push("/welcome");
    } else if (newUser === "false") {
      history.push("/countdown");
    }
  };

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const googleAuth = params.get("token");
    const newUser = params.get("isNew");
    setCookies("token", googleAuth);
    setCookies("newUser", newUser);
    redirectChecker(newUser);
  }, []);

  return <div>Successfully Authenticated</div>;
};

export default LoginPage;
