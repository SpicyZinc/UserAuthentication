import {
	EDIT_SUCCESS,
	EDIT_FAILURE,
} from '../constants';
import axios from '../services/xhr';
import history from '../services/history';


const EditSuccess = (user) => ({
	type: EDIT_SUCCESS,
	user
});

const EditFailure = (error) => ({
	type: EDIT_FAILURE,
	error
});

export default function edit(user) {
	return (dispatch) => {
		let promise = axios({ 
			url: '/edit',
			method: 'post',
			data: user 
		});

		promise.then((response) => {
			if (response.statusText === 'OK') {
				dispatch(EditSuccess(response.data));
				history.push('/profile');
			}
		});
		promise.catch((error) => {
			dispatch(EditFailure(error));
		});

		return promise;
	};
}