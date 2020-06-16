import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import App from "../App";


 const ProtectedRoute = ({
  path: path,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (App.loggedInStatus=="LOGGED_IN") {
          return <path {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/sigin",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;