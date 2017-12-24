import { LOGOUT } from '../constants';

const logout = () => {
	localStorage.removeItem('user');
	return {
		type: LOGOUT
	}
}

export default logout;