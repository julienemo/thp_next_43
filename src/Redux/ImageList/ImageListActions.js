import { SET_IMAGE_LIST, ADD_IMAGE, DELETE_IMAGE, CHANGE_IMAGE } from "./ImageListTypes";

export const setImageList = (list) => {
  return {
    type: SET_IMAGE_LIST,
    list,
  }  
}

export const addImage = (response) => {
  return {
    type: ADD_IMAGE,
    ...response,
  }
}
 
export const changeImage = (response) => { 
  return {
    type: CHANGE_IMAGE,
    ...response,
  }
}

export const deleteImage = (response) => {
  return {
    type: DELETE_IMAGE,
    ...response,
  }
}
