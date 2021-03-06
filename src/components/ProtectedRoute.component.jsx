/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React from "react";
import { Cookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, redirect, ...rest }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const newUser = cookies.get("newUser");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token === "undefined" || token == null) {
          return <Redirect to={redirect} />;
        }
        if (newUser === "true") {
          return <Redirect to="/welcome" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
