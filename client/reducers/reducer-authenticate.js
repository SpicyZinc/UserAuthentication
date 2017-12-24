
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	FAKE_EVENT
} from '../constants';

const initialState = {
	loggingIn: false,
	loggedIn: false,
	user: {},
	error: ''
};

const authenticationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return { ...state,
				loggingIn: true,
				loggedIn: false,
				user: action.user,
			};
		case LOGIN_SUCCESS:
			return { ...state,
				loggingIn: false,
				loggedIn: true,
				user: action.user,
			};
		case LOGIN_FAILURE:
			return { ...state,
				loggingIn: false,
				loggedIn: false,
				user: {},
				error: action.error
			};
		case FAKE_EVENT:
			return { ...state,
				fakeEvent: action.message
			};

		case LOGOUT:
			return {};
		default:
			return state;
	}
};

export default authenticationReducer;