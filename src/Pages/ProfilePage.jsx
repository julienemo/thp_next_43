import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShortId from "shortid";

import SingleImage from "../Components/SingleImage"
import { setAlertFlash, setImageList } from "../Redux";
import { descDateOrderArray } from "../Tools";

const ProfilePage = () => {
  console.log("In profile page");

  const imageList = useSelector((state) => state.images.list);
  console.log(imageList)
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/profile/images", {
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
        console.log(error);
        dispatch(setAlertFlash("An error occurred", "error"))
      })

  }, [dispatch, token]);



  return (
    <div className="page">
      <p>This this my profile page</p>
      <p>These are my photos</p>
      {imageList && imageList.length === 0 && <p>...<br/>Well obviously I have no photo 0_o</p>}
      {imageList && descDateOrderArray(imageList).map((el) => <SingleImage key={ShortId.generate()} image={el} />)}
    </div>
  )
 }

export default ProfilePage;