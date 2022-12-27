import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED-SUCCES';


let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCES:
      return {
        ...state,
        initialized: true
      }
    default:
      return state;
  }

}

export const initializedSucces = () => ({ type: INITIALIZED_SUCCES }); //здесь мы экспортируем action creator

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise])
    .then(() => {
      dispatch(initializedSucces());
    })

}


export default appReducer;