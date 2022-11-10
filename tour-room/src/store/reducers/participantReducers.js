import { SET_PARTICIPANTS, SET_WAIT_PARTICIPANTS, SET_ACTIVE_PARTICIPANTS, SET_RISE_PARTICIPANT } from '../actionTypes';

const filterParticipants = (oldParticipants, newParticipants) => {
  const ids = Array.from(newParticipants, ({ id }) => id);
  return oldParticipants.filter(participant => ids.includes(participant.id));
}

export const ParticipantReducer = (state = {}, action) => {
  const waitParticipants = state['wait'] ?? [];
  const waitIds = Array.from(waitParticipants, ({ id }) => id);
  const activeParticipants = state['active'] ?? [];
  const activeIds = Array.from(activeParticipants, ({ id }) => id);

  switch (action.type) {
    case SET_PARTICIPANTS:
      const host = action.payload.find(participant => participant.role === 'ROLE_HOST');
      const self = action.payload.find(participant => participant.isSelf);
      return {
        host,
        self,
        wait: filterParticipants(waitParticipants, action.payload),
        active: filterParticipants(activeParticipants, action.payload),
      };
    case SET_WAIT_PARTICIPANTS:
      const newWaits = action.payload.filter(participant => (
        !waitIds.includes(participant.id)
      ));
      state['wait'] = [...waitParticipants, ...newWaits];
      return { ...state };
    case SET_ACTIVE_PARTICIPANTS:
      const newIds = Array.from(action.payload, ({ id }) => id);
      state['wait'] = waitParticipants.filter(participant => (
        !newIds.includes(participant.id)
      ));
      const newActives = action.payload.filter(participant => (
        !activeIds.includes(participant.id)
      ));
      state['active'] = [...activeParticipants, ...newActives];
      return { ...state };
    case SET_RISE_PARTICIPANT:
      if (state['self'].id === action.payload.id) {
        state['self'] = { ...state['self'], hand: action.payload.value };
      }
      state['active'] = activeParticipants.map(participant => {
        if (participant.id === action.payload.id) {
          return { ...participant, hand: action.payload.value };
        }
        return participant;
      });
      return { ...state };
    default:
      return state;
  }
}
