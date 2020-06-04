import React from "react"

const SingleImage = (image) => {
  console.log('in single image')
  const imageObject = image.image;
  console.log(imageObject)

  const display = () => { 
    return (
      <div className="single_image">
        <div>
          <p>Here is the image</p>
          <div>
            <p><strong>@{imageObject.uploaded_by.username}</strong> on {
              imageObject.created_at
            }</p>
            {imageObject.comments.length > 0 && <p>{imageObject.comments.length} comments</p>}
          </div>
        </div>
      </div>
    )

  }
  return (<div>
    {display()}
  </div>)
 }

export default SingleImage;