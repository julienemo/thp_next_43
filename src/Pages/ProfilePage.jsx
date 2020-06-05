import React, { useEffect,useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShortId from "shortid";

import { setAlertFlash, setImageList } from "../Redux";
import { descDateOrderArray } from "../Tools";
import SingleImage from "../Components/SingleImage"

const ProfilePage = () => {
  const { userId } = useParams();
  const inProfile = userId === undefined
  const currentUserId = useSelector((state) => state.user.id);
  const isMe = currentUserId.toString() === userId;
  const history = useHistory();

  if (isMe) {
    history.push("/profile");
  }

  const [load, setLoad] = useState(null)
  console.log("In profile page" + userId);
  const imageList = useSelector((state) => state.images.list);
  console.log(imageList)
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();



  const imageQueryUrl = (userId === undefined || isMe) ? "http://localhost:3000/profile/images" : `http://localhost:3000/users/${userId}/images`

  useEffect(() => {
    fetch(imageQueryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (response.error) {
          if (response.error === "Not Found") { 
            history.push("/error")
            setLoad(false)
          } else {
            dispatch(setAlertFlash("An error occurred", "error"))
          }
        } else {
          dispatch(setImageList((response)));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(setAlertFlash("An error occurred", "error"))
      })

  }, [dispatch, history, imageQueryUrl, token]);



  return (
    <div className="page">
      {load !== false && (
        <>
          {inProfile && <p>This this my profile page</p>}
          {!inProfile && <p>User {userId}</p>}
          {imageList && imageList.length === 0 && <p>No photo yet 0_o</p>}
          {imageList && descDateOrderArray(imageList).map((el) => <SingleImage key={ShortId.generate()} image={el} />)}
        </>
      )}
    </div>
  )
 }

export default ProfilePage;