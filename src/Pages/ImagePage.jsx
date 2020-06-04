import React, { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setAlertFlash, deleteImage } from "../Redux";
import UsernameLink from "../Components/UsernameLink";
import shortid from "shortid";
import ChangeImage from "../Components/ChangeImage";

const ImagePage = (props) => { 
  console.log('in image page')
  const { imageID } = useParams();
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [image, setImage] = useState(props.location.targetImage)
  const [description, setDescription] = useState(image?image.description:null);
  const [isPrivate, setIsPrivate] = useState(image?image.is_private:null)

  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userOwnsImage = image && image.uploaded_by_id === userId;

  const deleteCurrentImage = () => { 
    console.log('delete photo clicked')
    fetch(`http://localhost:3000/images/${imageID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(response => { 
        console.log(response);
        if (response.error) {
          if (response.error === "Not Found") { 
            // in case of inexistant image
            dispatch(setAlertFlash("The action couldn't be performed", "success"))
          }
        } else {
          // we are not in a list view, no need to dispatch(deleteImage(response))
          dispatch(setAlertFlash("The photo is deleted", "success"))
          history.push("/")
        }
      })
      .catch((error) => { 
        console.error(error);
        dispatch(setAlertFlash("An error occured.", "error"))
      })
  }

  const updateImageDetail = (response) => {
    console.log('in update')
    setDescription(response.description)
    setIsPrivate(response.is_private)
    setIsEditing(false)
  }

  const showChangeImageFields = () => {
    console.log("change image clicked");
    setIsEditing(true);
  }

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
            setDescription(response.description)
            setIsPrivate(response.is_private)
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(setAlertFlash("An error occurred", "error"))
        })
    }
  }, [dispatch, history, image, imageID, token])
  
  const display = () => { 
    return (
      <div>
        <p>@{image.uploaded_by.username}</p>
        <p>Here is the photo{isPrivate ===true && <>, only you can see it</>}</p>
        <p>{description && description}</p>
        {userOwnsImage && <div>
          <ul>
            <li><button onClick={deleteCurrentImage}>delete</button></li>
            {!isEditing && <li><button onClick={showChangeImageFields}>change</button></li>}
          </ul>
        </div>}
        {isEditing && <ChangeImage targetImage={{
          id: image.id,
          description: image.description,
          is_private: image.is_private,
          updateFunction: updateImageDetail,
        }}/>}  
        <div>    
          {image.comments.length > 0 && image.comments.map((el) => (<p key={shortid.generate()}><UsernameLink targetUser={el.author}/> said on {el.created_at} "{el.content}"</p>))}
        </div>
      </div>
    )
  }
  return (<>
    {image && display() }
    {!image && <p>There is something but no, you can't see</p>}
  </>)

}

export default ImagePage;