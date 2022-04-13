import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const Register = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const usernameChangeHandle = (e) => {
    setUsername(e.target.value);
  };
  const emailChangeHandle = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandle = (e) => {
    setPassword(e.target.value);
  };

  const registerHandle = (e) => {
    AuthService.register(username, email, password)
      .then(() => {
        alert("Registration succeeds.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="register">
      {message && <div className="alert">{message}</div>}
      <div className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={usernameChangeHandle} type="text" name="username" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input onChange={emailChangeHandle} type="text" name="email" />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordChangeHandle}
            type="password"
            name="password"
          />
        </div>
        <br />
        <button onClick={registerHandle}>
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
