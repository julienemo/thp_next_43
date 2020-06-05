import Cookies from "js-cookie";
import { CookieName } from "../Constants"

export const StoreUser = (response) => {
  Cookies.set(
    CookieName,
    JSON.stringify(response)
  );
};

export const ClearUser = () => {
  Cookies.remove(CookieName);
};

export const ChangeUser = (username) => {
  const original = JSON.parse(Cookies.get(CookieName));
  const newCookie = { ...original, username };
  Cookies.set(CookieName, JSON.stringify(newCookie));
};

export const descDateOrderArray = (array) => { 
  const compare = (a, b) => {
    return a.created_at < b.created_at ? 1:-1
  }
  return array.sort(compare)
}