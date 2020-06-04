import { SET_USER, CLEAR_USER, UPDATE_USER } from "./UserTypes";
import Cookies from "js-cookie";

import { CookieName } from "../../Constants"

const cookie = Cookies.get(CookieName) !== undefined ? JSON.parse(Cookies.get(CookieName)): {
  token: null,
  id: null,
  username: null,
  first_name: null,
  last_name: null,
}

const initial = {
  token: cookie.token,
  id: cookie.id,
  username: cookie.username,
  first_name: cookie.first_name,
  last_name: cookie.last_name,
};

initial.hasUser = initial.token ? true : false;
console.log('initial has user'+initial.hasUser)
const UserReducer = (state = initial, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        token: action.token,
        id: action.id,
        username: action.username,
        first_name: action.first_name,
        last_name: action.last_name,
        hasUser: true,
      };
    case CLEAR_USER:
      console.log('in reducer clear user')
      return {
        token: null,
        id: null,
        username: null,
        first_name: null,
        last_name: null,
        hasUser: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        username: action.username,
        first_name: action.first_name,
        last_name: action.last_name,
      };
    default:
      return state;
  }
};

export default UserReducer;