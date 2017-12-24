import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import registerReducer from './reducer-register';
import loginReducer from './reducer-authenticate';
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
	routing: routerReducer,
	form: formReducer,
	register: registerReducer,
	login: loginReducer,
});

export default reducers;