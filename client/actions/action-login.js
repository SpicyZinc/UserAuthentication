import history from '../services/history';
import axios from '../services/xhr';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';


const LoginRequest = (user) => ({
    type: LOGIN_REQUEST,
    user
});

const LoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

const LoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error: 'Login falied! Account or password is incorrect!'
});

export default function login(info) {
    return (dispatch) => {
        dispatch(LoginRequest(info.account));

        let promise = axios({ 
            url: '/login',
            method: 'post',
            data: info,
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
        });

        return promise;
    };
}

