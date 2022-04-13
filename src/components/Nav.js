import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth";

const Nav = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const logoutHandle = () => {
    AuthService.logout();
    setCurrentUser(null);
    alert("Logout successfully, you're redirect to home page.");
    navigate("/");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          {!currentUser && (
            <>
              <li>
                <Link className="link" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li>
                <Link className="link" onClick={logoutHandle} to="/">
                  Logout
                </Link>
              </li>
              <li>
                <Link className="link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" to="/profile/newpost">
                  New Post
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
