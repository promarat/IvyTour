import { GET_UNIVERSITIES } from "../actionTypes";

export const UniversityReducer = (state = [], action) => {
  switch (action.type) {
    case GET_UNIVERSITIES:
      return [...action.payload];
    default:
      return state;
  }
}
