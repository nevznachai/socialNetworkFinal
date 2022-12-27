import { UsersAPI } from "../api/api";
import {updateObjectInArray} from "./../utils/object-helpers" 

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE-IS-FOLLOWING-IN-PROGRESS';



let initialState = {
    users: [],
    pageSize: 10,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray (state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }

        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state, totalItemsCount: action.count
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }

}

export const followSuccess = (userId) => ({ type: FOLLOW, userId }) //здесь мы экспортируем action creator
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const settotalItemsCount = (totalItemsCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalItemsCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId })


export const requestUsers = (currentPage, pageSize) => {                           // это так называемый  thunk creator
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        let data = await UsersAPI.requestUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(settotalItemsCount(data.totalCount));
    }
}

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {         // общая логика thunk creator для рефакторинга
    dispatch(toggleFollowingInProgress(true, userId));
    let Response = await apiMethod(userId);
    if (Response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingInProgress(false, userId));
};

export const follow = (userId) => {                           // это так называемый  thunk creator
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
    };
}

export const unfollow = (userId) => {                           // это так называемый  thunk creator
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess);
    };
}


export default usersReducer;