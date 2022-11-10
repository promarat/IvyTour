import { GET_UNIVERSITIES } from "../actionTypes";
import { UNIVERSITIES } from "../../common/common";

export const getUniversities = () => (dispatch) => {
  dispatch({
    type: GET_UNIVERSITIES,
    payload: UNIVERSITIES,
  });
}
