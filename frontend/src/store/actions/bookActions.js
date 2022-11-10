import { SET_BOOK_INFO } from "../actionTypes";

export const setBookInfo = (info) => (dispatch) => {
  dispatch({
    type: SET_BOOK_INFO,
    payload: info,
  })
}
