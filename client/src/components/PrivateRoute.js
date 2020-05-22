import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    return <Component />;
  } else {
    return <Redirect to="/" />;
  }
};
