import React from "react"
import { useSelector, useDispatch } from "react-redux";

import { setAlertFlash } from "../Redux";
import UsernameLink from "./UsernameLink";

const SingleComment = (comment) => {
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const commentObject = comment.comment;
  const userOwnsComment = commentObject.author_id === userId;
  const dispatch = useDispatch();

  const deleteCurrentComment = () => {
    fetch(`http://localhost:3000/comments/${commentObject.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          if (response.error === "Not Found") {
            // in case of inexistent comment
            dispatch(setAlertFlash("The action couldn't be performed", "success"))
          }
        } else {
          commentObject.deleteCommentFunction(response);
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(setAlertFlash("An error occurred.", "error"))
      })
  }

  return (
    <div className="single_comment">
      <p><UsernameLink targetUser={commentObject.author} /> said on {commentObject.created_at} "{commentObject.content}"</p>
      {userOwnsComment && <p><button onClick={deleteCurrentComment}>Delete</button></p>}
    </div>
    )
}

export default SingleComment;