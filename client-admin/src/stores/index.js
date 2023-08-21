import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import newsReducer from "../reducers/newsReducer"
import categoryReducer from "../reducers/categoryReducer"
import userReducer from "../reducers/userReducer"

const rootStore = combineReducers({
    news: newsReducer,
    category: categoryReducer,
    user: userReducer
})

const store = createStore(rootStore, applyMiddleware(thunk))

export default store

