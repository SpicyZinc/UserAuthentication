import axios from 'axios';
import qs from 'query-string';

axios.defaults.baseURL = 'http://localhost:9898';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.transformRequest = [function(data, headers) {
	return qs.stringify(data);
}];


export default axios;