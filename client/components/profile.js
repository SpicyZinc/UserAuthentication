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
	RaisedButton,
	IconButton,
	Dialog
} from 'material-ui';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';

import logout from '../actions/action-logout';
import edit from '../actions/action-edit';
import removeSelf from '../actions/action-delete';
import EditForm from './register/edit';


class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			editModal: false
		}
	}

	handleSubmit(values) {
		console.log('edit form', values);

		this.props.edit(values);
		this.setState({
			editModal: this.props.user.editModal
		});
	}

	handleRemove() {
		console.log('Remove Profile');
		this.props.logout();
		this.props.removeSelf(this.props.user);
	}

	handleEdit() {
		console.log('Edit Profile');
		this.setState({
			editModal: true
		});
	}

	handleClose() {
		this.setState({
			editModal: false
		});	
	}

	render() {
		let props = this.props;
		let options = {
			onSubmit: this.handleSubmit,
			handleClose: this.handleClose,
			initialValues: this.props.user
		};

		return (
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
									<TableHeaderColumn>Actions</TableHeaderColumn>
								</TableRow>
							</TableHeader>

							<TableBody displayRowCheckbox={false}>
								<TableRow className='user-info'>
									<TableRowColumn>{props.isLogged && props.user.id}</TableRowColumn>
									<TableRowColumn>{props.isLogged && props.user.fn} {props.isLogged && props.user.ln}</TableRowColumn>
									<TableRowColumn>{props.isLogged && props.user.email}</TableRowColumn>
									<TableRowColumn>
										<IconButton
											touch={true}
											onClick={this.handleEdit}
										>
											<EditIcon />
										</IconButton>

										<IconButton
											touch={true}
											onClick={this.handleRemove}
										>
											<RemoveIcon />
										</IconButton>

									</TableRowColumn>
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

				{
					this.state.editModal ?
						<Dialog
							title='Edit your registered info'
							bodyClassName='edit-form'
							autoScrollBodyContent={true}
							modal={true}
							bodyStyle={{padding: 0}}
							open={this.state.editModal}
							onRequestClose={this.handleClose}
						>
							<EditForm { ...options } />
						</Dialog>
						: ''
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	routing: state.routing,
	isLogged: state.login.user && Object.keys(state.login.user).length !== 0,
	user: state.login.user,
});

const mapDispatchToProps = (dispatch) => ({
	logout: bindActionCreators(logout, dispatch),
	removeSelf: bindActionCreators(removeSelf, dispatch),
	edit: bindActionCreators(edit, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


