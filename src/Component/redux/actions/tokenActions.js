import {SET_TOKEN} from "../types";

export const setAccessToken = (val) => {
    return (dispatch) => {
        dispatch({
            type: SET_TOKEN,
            value: val
        });
    }
};
