import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UsernameLink from "./UsernameLink";
import { setAlertFlash } from "../Redux";

const SingleComment = (comment) => {
  console.log('in single comment')
  const commentObject = comment.comment;
  console.log(commentObject)

  const userId = useSelector((state) => state.user.id);
  const userOwnsComment = commentObject.author_id === userId;
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const deleteCurrentComment = () => {
    console.log('delete comment clicked')
    fetch(`http://localhost:3000/comments/${commentObject.id}`, {
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
          commentObject.deleteCommentFunction(response);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setAlertFlash("An error occured.", "error"))
      })
  }

  const display = () => {
    return (
      <div className="single_comment">
        <p><UsernameLink targetUser={commentObject.author} /> said on {commentObject.created_at} "{commentObject.content}"</p>
        {userOwnsComment && <p><button onClick={deleteCurrentComment}>Delete</button></p>}
      </div>
    )

  }
  return (<div>
    {display()}
  </div>)
}

export default SingleComment;