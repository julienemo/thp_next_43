import Cookies from "js-cookie";
import { CookieName } from "../Constants"

export const StoreUser = (response, history) => {
  Cookies.set(
    CookieName,
    JSON.stringify({
      id: response.user.id,
      username: response.user.username,
      token: response.jwt,
    })
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
