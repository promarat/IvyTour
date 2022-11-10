import { SET_USER_ACCOUNT } from "../actionTypes";

export const setUserAccount = (data) => (dispatch) => {
  dispatch({
    type: SET_USER_ACCOUNT,
    payload: data,
  })
}
