import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from '../constants';

const initialState = {
	registering: false,
	registered: false,
};

const registrationReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
			return { ...state,
				registering: true,
				registered: false,
			};
		case REGISTER_SUCCESS:
			return { ...state,
				registering: false,
				registered: true,
			};
		case REGISTER_FAILURE:
			return { ...state,
				registering: false,
				registered: false,
			};
		default:
			return state;
	}
};

export default registrationReducer;