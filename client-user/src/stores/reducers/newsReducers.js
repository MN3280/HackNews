import { NEWS_BY_ID, NEWS_SUCCESS, NEWS_PENDING } from "../actions/actionType"

const initialState = {
    news: [],
    newsDetail: [],
    isLoading: false
}

const newsReducer = (state = initialState, action) => {
    if (action.type === NEWS_SUCCESS) {
        return {
            ...state,
            news: action.payload,
            isLoading: false
        }
    } else if (action.type === NEWS_PENDING) {
        return {
            ...state,
            isLoading: action.payload
        }
    } else if (action.type === NEWS_BY_ID) {
        // console.log(action.payload, "ini dari 21 bews");
        return {
            ...state,
            newsDetail: action.payload,
            isLoading: false
        }
    }
    return state
}

export default newsReducer