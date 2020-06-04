import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const SingleImage = (image) => {
  console.log('in single image')
  const imageObject = image.image;
  const userId = useSelector((state) => state.user.id);
  console.log(imageObject)
  const userOwnsImage = imageObject.uploaded_by_id === userId;
  const userCanSeeImage = (imageObject.is_private && !userOwnsImage) ? false : true

  const display = () => { 
    return (
      <div className="single_image">
        <div>
          <p><Link to={`/images/${imageObject.id}`}>Here is the image {imageObject.is_private.toString()}</Link></p>
          {imageObject.description && <p>{imageObject.description}</p>}
          <div>
            <p><strong>@{imageObject.uploaded_by.username}</strong> on {
              imageObject.created_at
            }</p>
            {imageObject.comments.length > 0 && <p>{imageObject.comments.length} comments</p>}
          </div>
          {userOwnsImage && (
            <div>
              <ul>
                <li>Change</li>
                <li>Delete</li>
              </ul>
            </div>
          )}

        </div>
      </div>
    )

  }
  return (<div>
    {userCanSeeImage && display()}
  </div>)
 }

export default SingleImage;