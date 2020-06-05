import React from "react"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UsernameLink = (targetUser) => {
  const userId = useSelector((state) => state.user.id);
  const userObject = targetUser.targetUser;
  const isMe = userObject.id === userId;

  return (<strong>
    {isMe && <Link to="/profile">I myself</Link>}
    {!isMe && <Link to={`/profile/${userObject.id}`}>@{userObject.username}</Link>}
  </strong>)
}

export default UsernameLink;