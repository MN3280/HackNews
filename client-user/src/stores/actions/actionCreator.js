import { NEWS_SUCCESS } from "../actions/actionType"
import { NEWS_PENDING } from "../actions/actionType"
import { NEWS_BY_ID } from "../actions/actionType"
const baseUrl = "http://localhost:8000"
// const baseUrl = "https://newsportalp3.martiniblue.dev"

export const fetchNewsSuccess = (payload) => ({
    type: NEWS_SUCCESS,
    payload
})

export const fetchNewsPending = (payload) => ({
    type: NEWS_PENDING,
    payload
})

export const fetchNewsById = (payload) => ({
    type: NEWS_BY_ID,
    payload
})

export const fetchNews = (filter) => {
    return async (dispatch) => {
        try {
            dispatch(fetchNewsPending(true))
            let query = ""
            if (filter) {
                const { title } = filter
                if (title) {
                    query = `title=${title}`
                }
            }
            const response = await fetch(`${baseUrl}/posts?${query}`)
            const responseJson = await response.json()
            dispatch(fetchNewsSuccess(responseJson.result))
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(fetchNewsPending(false))
        }
    }
}

export const newsById = (id) => {
    return async (dispatch) => {
        try {
            dispatch(fetchNewsPending(true))
            const response = await fetch(`${baseUrl}/posts/${id}`)
            const responseJson = await response.json()
            dispatch(fetchNewsById(responseJson.response))
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(fetchNewsPending(false))
        }
    }
}

