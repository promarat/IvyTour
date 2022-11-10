import { SET_PREMIUM_PLAN } from "../actionTypes";

export const setPremiumPlan = (data) => (dispatch) => {
  dispatch({
    type: SET_PREMIUM_PLAN,
    payload: data,
  })
}
