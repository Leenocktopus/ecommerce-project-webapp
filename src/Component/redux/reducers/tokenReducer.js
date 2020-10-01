import {SET_TOKEN} from "../types";


export default (state = {token: ""}, action) => {
    switch (action.type) {
        case SET_TOKEN:
            state['token'] = action.value
            return state
        default:
            return state
    }
}