import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initFormValue = {
  username: "Lambda School",
  password: "i<3Lambd4",
};
const Login = () => {
  const [credentials, setCredentials] = useState(initFormValue);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const changeHandle = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={submitHandle}>
          <input
            name="username"
            type="text"
            value={credentials.username}
            onChange={changeHandle}
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={changeHandle}
            placeholder="Password"
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
