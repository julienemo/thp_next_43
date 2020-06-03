import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ClearUser } from "../Tools";
import { setAlertFlash, clearUser } from "../Redux";


const Navbar = () => { 
  console.log('In NavBar');

  const hasUser = useSelector((state) => state.user.hasUser);
  const firstName = useSelector((state) => state.user.first_name);
  console.log('now has user ' + hasUser)
  console.log('now first name ' + firstName)
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    ClearUser();
    dispatch(clearUser)
    dispatch(setAlertFlash("You are logged out, feel free to come back anytime", "success"))
    history.push("/sign_in")
    console.log(hasUser)
    console.log(token)
  };
  return (
    <nav>
      <p>This is the navbar</p>
      {firstName && <p>hey {firstName}</p>}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
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