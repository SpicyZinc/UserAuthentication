import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const configureStore = (initialState = {}) => {
	// Midddleware and store enhancers
	const enhancers = [ applyMiddleware(thunk, createLogger()) ];
	const store = createStore(reducers, initialState, compose(...enhancers));
	
	return store;
};

const store = configureStore();

export default store;