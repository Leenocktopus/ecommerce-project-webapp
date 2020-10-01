import {combineReducers} from "redux";
import cartReducer from "./cartReducer";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";

export default combineReducers({
    cartState: cartReducer,
    tokenState: tokenReducer,
    userState: userReducer
});