import {SET_USER} from "../types";

export default (state ="", action) =>{
    switch (action.type) {
        case SET_USER:
            return action.value
        default:
            return state
    }
}