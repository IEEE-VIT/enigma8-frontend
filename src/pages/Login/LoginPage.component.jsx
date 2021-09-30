import React from "react";

const LoginPage = () => {
  const GoogleAuthRedirect = () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/web/google`;
    window.open(url, "_self");
  };
  return (
    <div>
      LoginPage
      <br />
      <button
        type="button"
        onClick={() => {
          GoogleAuthRedirect();
        }}
      >
        Continue with Google
      </button>
    </div>
  );
};

export default LoginPage;
