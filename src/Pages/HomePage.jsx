import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShortId from "shortid";

import { setAlertFlash, setImageList } from "../Redux";
import { descDateOrderArray } from "../Tools";
import NewImage from "../Components/NewImage";
import SingleImage from "../Components/SingleImage"

const HomePage = () => {
  const imageList = useSelector((state) => state.images.list);
  const hasUser = useSelector((state) => state.user.hasUser);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => { 
    fetch("http://localhost:3000/images", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(response => { 
        if (response.error) {
          dispatch(setAlertFlash("An error occurred", "error"))
        } else { 
          dispatch(setImageList((response)));
        }
      })
      .catch(error => { 
        console.error(error);
        dispatch(setAlertFlash("An error occurred", "error"))
      })
    
  }, [dispatch, token]);

  return (
    <div className="page">
      <p>This this the home page</p>
      {!hasUser && <p>You're not logged in, you can't see anything, but welcome anyway.You can try <Link to="/sign_in">sign in</Link> though.</p>}
      {hasUser && <NewImage/>}
      {imageList && descDateOrderArray(imageList).map((el) => <SingleImage key={ShortId.generate()} image={el} />)}
    </div>
  )
 }

export default HomePage;