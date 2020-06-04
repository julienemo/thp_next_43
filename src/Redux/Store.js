import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import UserReducer from "./User/UserReducer";
import AlertReducer from "./Alert/AlertReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  alert: AlertReducer,
});

const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default Store;