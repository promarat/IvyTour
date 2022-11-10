import { SET_PARTICIPANTS, SET_WAIT_PARTICIPANTS, SET_ACTIVE_PARTICIPANTS, SET_RISE_PARTICIPANT } from '../actionTypes';

export const setParticipants = (participants) => (dispatch) => {
  dispatch({
    type: SET_PARTICIPANTS,
    payload: participants,
  });
}

export const setWaitParticipants = (participants) => (dispatch) => {
  dispatch({
    type: SET_WAIT_PARTICIPANTS,
    payload: participants,
  })
}

export const setActiveParticipants = (participants) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_PARTICIPANTS,
    payload: participants,
  })
}

export const setRiseParticipant = (id, value) => (dispatch) => {
  dispatch({
    type: SET_RISE_PARTICIPANT,
    payload: { id, value },
  })
}
