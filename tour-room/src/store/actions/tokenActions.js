import { SET_TOKEN } from '../actionTypes';

export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
}
