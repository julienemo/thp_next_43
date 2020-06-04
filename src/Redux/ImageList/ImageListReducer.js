import { SET_IMAGE_LIST, ADD_IMAGE, DELETE_IMAGE, CHANGE_IMAGE } from "./ImageListTypes";

const initial = {
  list: null
};

const ImageListReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_IMAGE_LIST:
      console.log('in reducer set image list');
      return {
        list: action.list,
      };
    case ADD_IMAGE:
      console.log('in reducer add image')
      let newState = {
        list: [...state.list],
      };
      newState.list.unshift(action.newPost);
      return newState;
    case DELETE_IMAGE:
      console.log('in reducer delete image')
      return {
        list: state.list.filter((el) => el.id !== action.id),
      };
    case CHANGE_IMAGE:
      console.log('in reducer change image')
      return {
        list: state.list.map((el) => el.id === action.id ? action : el),
      };
    default:
      return state;
  }
};

export default ImageListReducer;