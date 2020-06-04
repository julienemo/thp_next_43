import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import UserReducer from "./User/UserReducer";
import AlertFlashReducer from "./AlertFlash/AlertFlashReducer";
import ImageListReducer from "./ImageList/ImageListReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  alert: AlertFlashReducer,
  images: ImageListReducer,
});

const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default Store;