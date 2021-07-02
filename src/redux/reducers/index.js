import { combineReducers } from 'redux';
import reducer from './reducer';
import articlesReducer from './articlesReducer';
import errorsReducer from './errorsReducer';
import userReducer from './userReducer';

export default combineReducers({
  reducer,
  articlesReducer,
  errorsReducer,
  userReducer,
});
