import {combineReducers} from 'redux';
import {dataReducers} from './dataReducers';

const reducers = combineReducers({
  data: dataReducers,
});

export default reducers;
