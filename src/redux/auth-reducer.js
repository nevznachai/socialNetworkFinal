import { stopSubmit } from "redux-form";
import { AuthAPI } from "../api/api";

const SET_USER_DATA = 'my-network/auth/SET-USER-DATA';


let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: userId, email, login, isAuth }); //здесь мы экспортируем action creator

export const getAuthUserData = () => {
  return async (dispatch) => {
    let Response = await AuthAPI.me();
    if (Response.data.resultCode === 0) {
      let { id, email, login } = Response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  }
}
export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    let Response = await AuthAPI.login(email, password, rememberMe);
    if (Response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    }
    else {
      let message = Response.data.messages.length > 0 ? Response.data.messages[0] : 'some error';
      dispatch(stopSubmit('login', { _error: message }));
    }
  }
}
export const logout = () => {
  return async (dispatch) => {
    let Response = await AuthAPI.logout()
    if (Response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  }
}
export default authReducer;