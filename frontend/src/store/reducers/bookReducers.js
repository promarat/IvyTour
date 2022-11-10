import { SET_BOOK_INFO } from "../actionTypes";

export const BookReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_BOOK_INFO:
      return action.payload;
    default:
      return state;
  }
}
