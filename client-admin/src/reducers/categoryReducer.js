import { ADD_CATEGORY_SUCCESS, FETCH_CATEGORY_PENDING, FETCH_CATEGORY_SUCCESS, REMOVE_CATEGORY_SUCCESS, } from "../actions/actionType"


const initialState = {
    category: [],
    isLoading: false

}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_CATEGORY_SUCCESS:
            // console.log(action.payload, "line 13 f_cats");
            return {
                ...state,
                category: action.payload,
                isLoading: false
            }
        case ADD_CATEGORY_SUCCESS:
            console.log(action.payload, "line 13 add_cats");
            return {
                ...state,
                category: action.payload
            }
        case REMOVE_CATEGORY_SUCCESS:
            // console.log(action.payload, "line 25 REMOVE_cats");
            return {
                ...state,
                category: state.category.filter((c) => c.id !== action.payload) //agar data ny lgsung hilang dri dpan maka pakai filter 
            }
        case FETCH_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default userReducer