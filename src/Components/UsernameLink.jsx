import React from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UsernameLink = (targetUser) => {
  console.log('in username link')
  const userObject = targetUser.targetUser;
  console.log(userObject)
  const userId = useSelector((state) => state.user.id);
  const isMe = userObject.id.toString() === userId;

  const display = () => {
    if (isMe) { 
      return (<Link to="/profile">@{userObject.username}</Link>)
    }
    return (<Link to={`/profile/${userObject.id}`}>@{userObject.username}</Link>);
  }
  return (<strong>
    {display()}
  </strong>)
}

export default UsernameLink;