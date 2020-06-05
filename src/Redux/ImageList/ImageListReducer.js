import { SET_IMAGE_LIST, ADD_IMAGE, DELETE_IMAGE, CHANGE_IMAGE } from "./ImageListTypes";

const initial = {
  list: null
};

const ImageListReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_IMAGE_LIST:
      return {
        list: action.list,
      };
    case ADD_IMAGE:
      let newState = {
        list: [...state.list],
      };
      newState.list.unshift(action);
      return newState;
    case DELETE_IMAGE:
      return {
        list: state.list.filter((el) => el.id !== action.id),
      };
    case CHANGE_IMAGE:
      return {
        list: state.list.map((el) => el.id === action.id ? action : el),
      };
    default:
      return state;
  }
};

export default ImageListReducer;