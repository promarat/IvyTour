import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { UniversityReducer } from './reducers/universityReducers';
import { BookReducer } from './reducers/bookReducers';
import { AccountReducer } from './reducers/accountReducers';
import { PlanReducer } from './reducers/planReducers';

const initialState = {};
const rootReducer = combineReducers({
  universities: UniversityReducer,
  bookInfo: BookReducer,
  account: AccountReducer,
  premiumPlan: PlanReducer,
});

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);
