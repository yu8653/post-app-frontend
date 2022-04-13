import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const emailChangeHandle = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandle = (e) => {
    setPassword(e.target.value);
  };

  const loginHandle = () => {
    AuthService.login(email, password)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(AuthService.getCurrentUser());
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data);
      });
  };

  return (
    <div className="login">
      {message && (
        <div className="alert" role="alert">
          {message}
        </div>
      )}
      <div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="Email">Email</label>
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
          <div className="form-group">
            <button onClick={loginHandle}>
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
