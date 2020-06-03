import React from "react";

const ErrorPage = () => {
  console.log("In Error page");

  return (
    <div className="page">
      <p>The page you're looking for does not exist.</p>
      <p>Want something safe? What about using the nav bar?</p>
    </div>
  )
}

export default ErrorPage;