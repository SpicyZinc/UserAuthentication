import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { TextField, RaisedButton, Snackbar } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

import login from '../../actions/action-login';

const validate = (values) => {
	const errors = {};
	const requiredFields = [
		'account',
		'password',
	];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	})

	return errors;
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom}
	/>
);

let LoginForm = (props) => {
	const { handleSubmit, pristine, submitting } = props;
	return (
			<form name='form' onSubmit={handleSubmit}>
				<div>
					<Field
						type='text'
						name='account'
						component={renderTextField}
						label='Account'
					/>
				</div>
				<div>
					<Field
						type='password'
						name='password'
						required={true}
						component={renderTextField}
						label="Password"
					/>
				</div>
				<div>
					<RaisedButton
						type='submit'
						label='Log in'
						primary={true}
						disabled={pristine || submitting}
					/>
				</div>
			</form>
	);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	pristine: PropTypes.bool.isRequired,
	submitting: PropTypes.bool.isRequired,
};

LoginForm = (reduxForm({
	form: 'LoginForm',
	validate
})(LoginForm));

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		console.log(values);
		console.log('LoginForm');
		this.props.login(values);
	}

	render() {
		return (
			<div>
				<div>
					{
						this.props.authentication.error ?
							<Snackbar
								open={true}
								message={this.props.authentication.error}
								autoHideDuration={4000}
								bodyStyle={{backgroundColor: '#23E5AC'}}
								contentStyle={{color: '#140C04'}}
							/> : ''
					}

				</div>
				<LoginForm onSubmit={this.handleSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	routing: state.routing,
	authentication: state.login,
});

const mapDispatchToProps = (dispatch) => ({
	login: bindActionCreators(login, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
