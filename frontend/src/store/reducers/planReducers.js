import { SET_PREMIUM_PLAN } from "../actionTypes";

export const PlanReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_PREMIUM_PLAN:
      return action.payload;
    default:
      return state;
  }
}
