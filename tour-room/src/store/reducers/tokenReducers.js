import { SET_TOKEN } from '../actionTypes';

export const TokenReducer = (state = localStorage['token'] ?? '', action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    default:
      return state;
  }
}
