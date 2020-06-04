import { SET_IMAGE_LIST, ADD_IMAGE, DELETE_IMAGE, CHANGE_IMAGE } from "./ImageListTypes";

export const setImageList = (list) => {
  console.log('in action set image list');
  console.log(list);
  return {
    type: SET_IMAGE_LIST,
    list,
  }  
}

export const addImage = (response) => {
  console.log('in action add image');
  console.log(response);
  return {
    type: ADD_IMAGE,
    ...response,
  }
}
 
export const changeImage = (response) => { 
  console.log('in action changeImage');
  console.log(response);
  return {
    type: CHANGE_IMAGE,
    ...response,
  }
}

export const deleteImage = (response) => {
  console.log('in action deleteImage');
  console.log(response);
  return {
    type: DELETE_IMAGE,
    ...response,
  }
}