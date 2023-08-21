import { ADD_NEWS_SUCCESS, ADD_USER_SUCCESS, FETCH_CATEGORY_PENDING, FETCH_CATEGORY_SUCCESS, FETCH_NEWS_SUCCESS, LOGIN_USER_SUCCESS, NEWS_BY_ID, NEWS_PENDING, UPDATE_NEWS_SUCCESS } from "./actionType";
const baseUrl = "http://localhost:8000"
// const baseUrl = "https://newsportalp3.martiniblue.dev"
import Swal from "sweetalert2";

export const fetchNews = (news) => ({
    type: FETCH_NEWS_SUCCESS,
    payload: news
})

export const fetchNewsPending = (newsPending) => ({
    type: NEWS_PENDING,
    payload: newsPending
})

export const fetchNewsSuccess = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchNewsPending(true))
            const response = await fetch(`${baseUrl}/posts`)
            const responseJson = await response.json()
            dispatch(fetchNews(responseJson.result))
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(fetchNewsPending(false))

        }
    }
}

//delete News
export const deleteNews = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${baseUrl}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
            dispatch(fetchNewsSuccess())
            Swal.fire({
                icon: "success",
                title: `News Deleted!`,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
            });
        }
    }
}

//add News
export const addNews = (news) => ({
    type: ADD_NEWS_SUCCESS,
    payload: news
})

export const addNewsSuccess = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/posts/createPost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(data)
            })
            const responseJson = await response.json();

            if (response.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: `${responseJson.message}`,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: `News Added!`,
                });
                dispatch(addNews(responseJson))
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: `${err.message}`,
            });
        }
    }
}

//edit news
export const editNews = (news, tags) => ({
    type: NEWS_BY_ID,
    payload: news,
    payload2: tags
})

//get one by id untuk edit (get)
export const editNewsById = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/posts/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.getItem("access_token")
                }
            })
            const responseJson = await response.json();
            dispatch(editNews(responseJson))
        } catch (err) {
            console.log(err);
        }
    }
}

export const editNewsPost = (news) => ({
    type: UPDATE_NEWS_SUCCESS,
    payload: news
})
//POST untuk edit

export const editNewsSuccess = (id, data = {}) => {
    return async (dispatch) => {
        try {
            console.log(data, 'dataCreator')
            const response = await fetch(`${baseUrl}/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(data)
            })
            const responseJson = await response.json()
            Swal.fire({
                icon: "success",
                title: `News Edited!`,
            });
            dispatch(editNews(responseJson))
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: `Please check your input!`,
            });
        }
    }
}


//category
export const fetchCategory = (category) => ({
    type: FETCH_CATEGORY_SUCCESS,
    payload: category
})

export const fetchCategoryPending = (categoryPending) => ({
    type: FETCH_CATEGORY_PENDING,
    payload: categoryPending
})

export const fetchCategorySuccess = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchCategoryPending(true))
            const response = await fetch(`${baseUrl}/categories`)
            const responseJson = await response.json()
            dispatch(fetchCategory(responseJson.result))
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(fetchCategoryPending(false))
        }
    }
}

//delete category
export const deleteCategory = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${baseUrl}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    "access_token": localStorage.getItem("access_token")
                }
            })
            dispatch(fetchCategorySuccess())
            Swal.fire({
                icon: "success",
                title: `Category deleted!`,
            });
        } catch (err) {
            console.log(err);
        }
    }
}


//add category 
export const addCategory = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category
})

export const addCategorySuccess = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/categories/createCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(data)
            })
            const responseJson = await response.json();
            Swal.fire({
                icon: "success",
                title: `Category added!`,
            });
            dispatch(addCategory(responseJson))
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: `${err.message}`,
            });
        }
    }
}

//user
export const userLogin = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
})

export const userLoginSuccess = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(data)
            })
            dispatch(userLogin(response))
            Swal.fire({
                icon: "success",
                title: `Login success!`,
            });
            const responseJson = await response.json()
            if (response.status === 200) {
                localStorage.setItem("access_token", responseJson.access_token)
                localStorage.setItem("email", responseJson.email)
                localStorage.setItem("role", responseJson.role)
                localStorage.setItem("username", responseJson.username)
            } else {
                Swal.fire({
                    icon: "error",
                    title: `Please check your input!`,
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: `Please check your input!`,
            });
        }
    }
}

export const userRegister = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user
})

export const userRegisterSucess = (data) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${baseUrl}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": localStorage.getItem("access_token")
                },
                body: JSON.stringify(data)
            })

            if (response.status === 201) {
                const responseJson = await response.json();
                Swal.fire({
                    icon: "success",
                    title: `Admin Created!`,
                });
                dispatch(userRegister(responseJson.msg))
            } else {
                Swal.fire({
                    icon: "error",
                    title: `${err.message}`,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: `Email already existed`,
            });
            console.log(err);
        }
    }
}