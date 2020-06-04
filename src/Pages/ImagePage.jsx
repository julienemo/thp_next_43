import React, { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setAlertFlash } from "../Redux";
import UsernameLink from "../Components/UsernameLink";
import shortid from "shortid";

const ImagePage = (props) => { 
  
  console.log('in image page')
  const { imageID } = useParams();
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState(props.location.targetImage)
  const userOwnsImage = image && image.uploaded_by_id === userId;
  const userCanSeeImage = (image && image.is_private && image.uploaded_by_id !== userId) ? false : true

  useEffect(() => {
    if (!image) {
      fetch(`http://localhost:3000/images/${imageID}`, {
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
              history.push('/error')
            }
            if (response.detail === "Can not find the required resource") {
              history.push('/error')

             }
          } else { 
            setImage(response)
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(setAlertFlash("An error occurred", "error"))
        })
    }}, [dispatch, history, image, imageID, token])


  
  const display = () => { 
    return (
      <div>
      <p>@{image.uploaded_by.username}</p>
        <p>Here is the photo</p>
        <div>
          {image.comments.length > 0 && image.comments.map((el) => (<p key={shortid.generate()}><UsernameLink targetUser={el.author}/> said on {el.created_at} "{el.content}"</p>))}
        </div>
    </div>)
  }
  return (<>
    {image && display() }
    {!image && <p>There is something but no, you can't see</p>}
  </>)

}

export default ImagePage;