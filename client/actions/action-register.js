import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from '../constants';
import axios from '../services/xhr';
import history from '../services/history';


const Request = (user) => ({
	type: REGISTER_REQUEST,
	user
});

const RequestSuccess = (user) => ({
	type: REGISTER_SUCCESS,
	user
});

const RequestFailure = (error) => ({
	type: REGISTER_FAILURE,
	error
});

export default function register(user) {
    return (dispatch) => {
        dispatch(Request(user));

		let promise = axios({ 
			url: '/signup',
			method: 'post',
			data: user 
		});

		promise.then((response) => {
			if (response.statusText === 'OK') {
				dispatch(RequestSuccess(response.data));
				history.push('/login');
			}
		});
		promise.catch((error) => {
			dispatch(RequestFailure(error));
		});

		return promise;
    };
}