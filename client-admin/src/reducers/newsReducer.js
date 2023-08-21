import { ADD_NEWS_SUCCESS, FETCH_NEWS_SUCCESS, NEWS_BY_ID, NEWS_PENDING, REMOVE_NEWS_SUCCESS, UPDATE_NEWS_SUCCESS } from "../actions/actionType"


const initialState = {
    news: [],
    newsDetail: [],
    isLoading: false
}

const newsReducer = (state = initialState, action) => {
    if (action.type === FETCH_NEWS_SUCCESS) {
        // console.log("masuk newsReducer line12", action.payload);
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
        return {
            ...state,
            newsDetail: action.payload,
        }
    } else if (action.type === ADD_NEWS_SUCCESS) {
        console.log("masuk addnews 30", action.payload);

        return {
            ...state,
            news: action.payload
        }
    } else if (action.type === REMOVE_NEWS_SUCCESS) {
        return {
            ...state,
            news: state.news.filter((n) => n.id !== action.payload) //agar data ny lgsung hilang dri dpan maka pakai filter 

        }
    } else if (action.type === UPDATE_NEWS_SUCCESS) {
        console.log("masuk addnews 30", action.payload);

        return {
            ...state,
            newsDetail: action.payload

        }
    }
    return state
}

export default newsReducer