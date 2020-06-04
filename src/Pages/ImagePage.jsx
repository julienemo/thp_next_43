import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlertFlash } from "../Redux";

const ImagePage = () => { 
  console.log('in image page')
  const { imageID } = useParams();
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null)

  const userCanSeeImage = (image && image.is_private && image.uploaded_by_id !== userId) ? false : true


  useEffect(() => { 
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
        setImage(response)
      })
      .catch((error) => { 
        console.error(error);
        dispatch(setAlertFlash("An error occurred", "error"))
      })

  }, [dispatch, imageID, token])
  
  const display = () => { 
    return (
      <div>
      <p>@{image.uploaded_by.username}</p>
        <p>Here is the photo</p>
        <div>
          {image.comments.length > 0 && image.comments.map((el) => (<p>{el.author.username} said on {el.created_at} "{el.content}"</p>))}
        </div>
    </div>)
  }
  return (<>
    {image && userCanSeeImage && display() }
    {(!image || !userCanSeeImage) && <p>There is something but no, you can't see</p>}
  </>)

}

export default ImagePage;