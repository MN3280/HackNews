import { ADD_USER_SUCCESS, FETCH_USER_SUCCESS, LOGIN_USER_SUCCESS } from "../actions/actionType"


const initialState = {
    user: [],
    dataLogin: [],
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USER_SUCCESS:
            console.log(action.payload, "line 13 f_user");
            return {
                ...state,
                user: action.payload
            }
        case ADD_USER_SUCCESS:
            console.log(action.payload, "line 13 add_user");
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER_SUCCESS:
            console.log(action.payload, "line 25 login_user");
            return {
                ...state,
                dataLogin: action.payload
            }
        default:
            return state
    }
}

export default userReducer