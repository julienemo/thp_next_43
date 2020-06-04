import Cookies from "js-cookie";
import { CookieName } from "../Constants"

export const StoreUser = (response) => {
  Cookies.set(
    CookieName,
    JSON.stringify(response)
  );
  console.log("cookie supposed to be set")
  console.log(Cookies.get(CookieName))
};

export const ClearUser = () => {
  Cookies.remove(CookieName);
  console.log('cookie is supposed to be removed, following current cookie')
  console.log(Cookies.get(CookieName))
};

export const ChangeUser = (username) => {
  const original = JSON.parse(Cookies.get(CookieName));
  const newCookie = { ...original, username };
  Cookies.set(CookieName, JSON.stringify(newCookie));
};
