import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import store from './store';
import Main from '../client/components/main';
import Profile from '../client/components/profile';
import Login from '../client/components/login/login';
import Register from '../client/components/register/register';

const history = syncHistoryWithStore(hashHistory, store);

const muiTheme = getMuiTheme({
	palette: {
		textColor: '#909090',
	},
	appBar: {
		color: '#ddd',
		textColor: 'black'
	},
});

const App = () => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={history}>
				<Route path='/' component={Main}>
					<IndexRedirect to='/login' />
					<Route path='/profile' component={Profile} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Route>
			</Router>
		</MuiThemeProvider>
	</Provider>
);

ReactDOM.render(<App />, document.querySelector('#app'));