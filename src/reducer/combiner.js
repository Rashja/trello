import { combineReducers } from "redux";
import todo from "./todos";

// combine multiple reducers
const reducer = combineReducers({
  todo,
});

export default reducer;
