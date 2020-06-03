import { SET_USER, CLEAR_USER, UPDATE_USER } from "./UserTypes";
import Cookies from "js-cookie";
import Decoded from "jwt-decode"

import { CookieName } from "../../Constants"

const cookieToken = Cookies.get(CookieName)

const decoded = () => { 
  if (cookieToken!== undefined) { 
    return Decoded(JSON.parse(Cookies.get(CookieName)))
  }
  return {
    id: null,
    username: null,
    first_name: null,
    last_name: null,
    token: null,
  }
}

const initial = {
  token: cookieToken,
  id: decoded().id,
  username: decoded().username,
  first_name: decoded().first_name,
  last_name: decoded().last_name,
};

initial.hasUser = initial.token!== undefined ? true : false;

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