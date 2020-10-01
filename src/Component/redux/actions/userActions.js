import {SET_USER} from "../types";

export const setUser = (val) => {
    return (dispatch) => {
        dispatch({
            type: SET_USER,
            value: val
        });
    }
};
