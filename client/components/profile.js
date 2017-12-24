import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	Card,
	CardTitle,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	RaisedButton
} from 'material-ui';

import logout from '../actions/action-logout';


const Profile = (props) => (
	<div>
		<Card className='container'>
			<CardTitle
				title="React Authentication Application"
				subtitle="This is the personal profile page."
			/>

			<div>
				<p>Hello <span className='user-name'>{props.isLogged && props.user.fn}</span>! You get access to this page only after authentication.</p>
				<p>You're authorized to see your secret Registered Information as below.</p>

				<Table>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Email</TableHeaderColumn>
						</TableRow>
					</TableHeader>

					<TableBody displayRowCheckbox={false}>
						<TableRow className='user-info'>
							<TableRowColumn>{props.isLogged && props.user.id}</TableRowColumn>
							<TableRowColumn>{props.isLogged && props.user.fn} {props.user.ln}</TableRowColumn>
							<TableRowColumn>{props.isLogged && props.user.email}</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</Card>
		<div className='logout'>
			<Link to='/login'>
				<RaisedButton
					secondary={true}
					type='button'
					label='Logout'
					onClick={props.logout}
				>
				</RaisedButton>
			</Link>
		</div>
	</div>
);


const mapStateToProps = (state) => ({
	routing: state.routing,
	isLogged: Object.keys(state.login.user).length !== 0,
	user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
	logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


