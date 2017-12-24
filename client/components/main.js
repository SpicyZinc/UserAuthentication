import React from 'react';
import { bindActionCreators } from 'redux';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import {
	AppBar,
	Card,
	Snackbar
} from 'material-ui';

import { FAKE_EVENT } from '../constants';
import getUser from '../actions/action-user';
import subscribeToFakeEvent from '../events/event-register';
import store from '../store';


const Menu = (props) => (
	<div className='links'>
		<Link to='/login'>Log in</Link>
		<Link to='/register'>Sign up</Link>
	</div>
);

const Image = (props) => (
	<img 
		src='http://www.signitysolutions.com/blog/wp-content/uploads/2016/02/salesforce-icon.png'
		height='60'
		width='60'
	/>
);


const styles = {
	container: {
		textAlign: 'center',
		height: 650,
		paddingTop: 100,
	},
};

class Main extends React.Component {
	constructor(props) {
		super(props);

		subscribeToFakeEvent((err, event) => {
			store.dispatch({
				type: FAKE_EVENT,
				message: event
			});
		});
	}

	componentDidMount() {
		this.props.getUser();
	}

	render() {
		return (
			<div>
				<AppBar
					title='User Authentication Application with React'
					iconElementLeft={<Image />}
					iconElementRight={<Menu />}
				/>
				<div>
					<Card style={styles.container}>
						{this.props.children}
					</Card>
				</div>

				{
					this.props.authentication.fakeEvent ?
						<Snackbar
							open={true}
							message={this.props.authentication.fakeEvent}
							autoHideDuration={2000}
							bodyStyle={{backgroundColor: '#202020'}}
							contentStyle={{color: '#DBD6EB'}}
						/> : ''
				}

			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	routing: state.routing,
	authentication: state.login,
});

const mapDispatchToProps = (dispatch) => ({
	getUser: bindActionCreators(getUser, dispatch)
});



export default connect(mapStateToProps, mapDispatchToProps)(Main);

