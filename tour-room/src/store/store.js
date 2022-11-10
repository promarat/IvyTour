import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { TokenReducer } from './reducers/tokenReducers';
import { ParticipantReducer } from './reducers/participantReducers';

const initialState = {};
const rootReducer = combineReducers({
  token: TokenReducer,
  participants: ParticipantReducer,
});

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);
