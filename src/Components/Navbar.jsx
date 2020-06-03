import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ClearUser } from "../Tools";

const Navbar = () => { 
  console.log('In NavBar');

  const hasUser = useSelector((state) => state.user.hasUser);
  // const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    ClearUser();
  };
  return (
    <nav>
      <p>This is the navbar</p>
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