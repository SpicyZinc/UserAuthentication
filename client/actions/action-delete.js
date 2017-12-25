import {
	DELETE_SUCCESS,
} from '../constants';
import axios from '../services/xhr';
import history from '../services/history';


const DeleteSuccess = (user) => ({
	type: DELETE_SUCCESS,
	user
});

export default function remove(user) {
	return (dispatch) => {
		let promise = axios({ 
			url: '/delete',
			method: 'post',
			data: user
		});

		promise.then((response) => {
			if (response.statusText === 'OK') {
				dispatch(DeleteSuccess(response.data));
				history.push('/register');
			}
		});

		return promise;
	};
}