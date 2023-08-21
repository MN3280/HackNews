import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import newsReducer from './reducers/newsReducers'


const rootStore = combineReducers({
    news: newsReducer
})

const store = createStore(rootStore, applyMiddleware(thunk))

export default store



