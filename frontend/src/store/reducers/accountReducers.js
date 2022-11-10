import { SET_USER_ACCOUNT } from "../actionTypes";

export const AccountReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}
