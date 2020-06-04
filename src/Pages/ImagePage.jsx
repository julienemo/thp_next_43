import React, { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setAlertFlash, deleteImage } from "../Redux";
import UsernameLink from "../Components/UsernameLink";
import shortid from "shortid";
import ChangeImage from "../Components/ChangeImage";
import SingleComment from "../Components/SingleComment"
import NewComment from "../Components/NewComment"

const ImagePage = (props) => { 
  console.log('in image page')
  const { imageID } = useParams();
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [image, setImage] = useState(props.location.targetImage)
  const [description, setDescription] = useState(image?image.description:null);
  const [isPrivate, setIsPrivate] = useState(image?image.is_private:null)
  const [comments, setComments] = useState(image ? image.comments : null)

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

  const addNewComment = (response) => {
    console.log('add new comment triggered');
    const newList = [...comments];
    newList.unshift(response);
    setComments(newList);
   }


  const deleteCommentById = (response) => {
    console.log('detele commment triggered')
    console.log(comments.filter((el) => el.id !== response.id))
    setComments(comments.filter((el)=> el.id!== response.id))
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
            setComments(response.comments)
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
        <p><UsernameLink targetUser={image.uploaded_by}/></p>
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

        }} />}
        <NewComment props={{id: image.id, addCommentFunction:addNewComment}}/>
        <div>    
          {comments && comments
            .map((el) => (<SingleComment key={shortid.generate()} comment={{ ...el, deleteCommentFunction: deleteCommentById, }}/>))}
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