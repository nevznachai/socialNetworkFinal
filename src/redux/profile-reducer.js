import { ProfileAPI, UsersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE-POST';


let initialState = {
    posts: [
        { id: 1, message: 'oh, hi Mark', likesCount: 15 },
        { id: 2, message: 'is it instagram?', likesCount: 20 }
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId),
            };
        }
        default:
            return state;
    }

}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })


export const getUserProfile = (userId) => {
    return async (dispatch) => {
        let Response = await UsersAPI.getProfile(userId);
        dispatch(setUserProfile(Response.data));
    }
}
export const getStatus = (userId) => {
    return async (dispatch) => {
        let Response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(Response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let Response = await ProfileAPI.updateStatus(status);
        if (Response.data.resultCode === 0) {
            dispatch(setStatus(Response.data));
        }
    }
}

export default profileReducer;