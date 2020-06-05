import React from "react";
import { Link, useHistory  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setAlertFlash, clearUser } from "../Redux";
import { ClearUser } from "../Tools";

const Navbar = () => { 
  const hasUser = useSelector((state) => state.user.hasUser);
  const token = useSelector((state) => state.user.token);
  const firstName = useSelector((state) => state.user.first_name);

  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    fetch("http://localhost:3000/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => { 
        if (response.statusText === "No Content") {
          ClearUser();
          dispatch(clearUser())
          dispatch(setAlertFlash("You are logged out, feel free to come back anytime", "success"))
          history.push("/sign_in")
        } else { 
          return response.json();
        }
      })
      .then(response => { 
        if (response && response.error) { 
          dispatch(setAlertFlash("An error occurred, please contact the service provider", "error"))
        }
      })
      .catch(error => { 
        console.error(error)
        dispatch(setAlertFlash("An error occurred, please contact the service provider", "error"))
      })
 };
  return (
    <nav>
      <p>THPGram</p>
      {firstName && <p>hey {firstName}</p>}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {hasUser && (
          <li>
            <Link to="/profile">Me</Link>
          </li>
        )}
        {!hasUser && (
          <li>
            <Link to="/sign_up">Sign Up</Link>
          </li>
        )}
        {!hasUser && (
          <li>
            <Link to="/sign_in">Sign In</Link>
          </li>
        )}
        {hasUser && (
          <li>
            <button onClick={signOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;