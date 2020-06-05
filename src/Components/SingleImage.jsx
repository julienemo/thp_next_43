import React from "react"
import { Link } from "react-router-dom";

import UsernameLink from "./UsernameLink";

const SingleImage = (image) => {
  const imageObject = image.image;

  return (
    <div className="single_image">
      {imageObject.is_private ? <p>private</p>:<></>}
      <div>
        <div>
          <Link to={{
          pathname: `/images/${imageObject.id}`,
          targetImage: { ...imageObject },
        }} >
            <img src={`data:image/${imageObject.stream}`} alt="uploaded by user" />
          </Link>
        </div>

        {imageObject.description && <p>{imageObject.description}</p>}

        <div>
          <p><UsernameLink targetUser={imageObject.uploaded_by} /> on {
            imageObject.created_at
          }</p>
          {imageObject.comments.length > 0 && <p>{imageObject.comments.length} comments</p>}
        </div>

      </div>
    </div>
  )
}

export default SingleImage;