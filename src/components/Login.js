import React from "react";
import { Button } from "@material-ui/core";
import "./style/login.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";

function Login() {
  let [{}, dispatch] = useStateValue();

  let signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="log">
      <div className="log_container">
        <h1>Login to Whatsapp Clone</h1>
        <Button type="submit" color="primary" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
