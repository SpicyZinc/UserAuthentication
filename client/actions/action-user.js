import history from '../services/history';
import axios from '../services/xhr';

import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';


const LoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

const LoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error: ''
});


export default function getUser(info) {
    let token = localStorage.getItem('user');

    return (dispatch) => {
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        let promise = axios.request({ 
            url: '/user',
            params: {
                token: token
            }
        });

        promise.then((response) => {
            console.log(response);
            if (response.statusText === 'OK') {
				dispatch(LoginSuccess(response.data));
				history.push('/profile');
				localStorage.setItem('user', response.data.token);
            }
        });
        promise.catch((error) => {
            console.log(error);
			dispatch(LoginFailure(error));
            history.push('/login');
        });

        return promise;
    };
}
