/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React from "react";
import { Cookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, redirect, ...rest }) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token === "undefined" || token == null ? (
          <Redirect to={redirect} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default ProtectedRoute;
