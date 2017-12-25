import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TextField, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

import register from '../../actions/action-register';

const validate = values => {
	const errors = {};
	const requiredFields = [
		'fn',
		'ln',
		'email',
		'account',
		'password',
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	})

	if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	
	if (values.password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/i.test(values.password)) {
		errors.password = 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
	}

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


class EditRegistrationForm extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { handleSubmit, handleClose } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<Field
							name='fn'
							component={renderTextField}
							label='First Name'
						/>
					</div>
					<div>
						<Field
							name='ln'
							component={renderTextField}
							label='Last Name'
						/>
					</div>
					<div>
						<Field
							name='email'
							disabled={true}
							component={renderTextField}
							label='Email'
						/>
					</div>			
					<div>
						<Field
							name='account'
							component={renderTextField}
							label='Account'
						/>
					</div>			
					<div>
						<Field
							type='password'
							name='password'
							component={renderTextField}
							label='Password'
						/>
					</div>
					<div className='edit-buttons'>
						<RaisedButton
							secondary={true}
							type='button'
							label='Cancel'
							onClick={handleClose}
						/>
						<RaisedButton
							primary={true}
							type='submit'
							label='Save'
						/>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	routing: state.routing,
	Registration: state.register
});

const mapDispatchToProps = (dispatch) => ({
	register: bindActionCreators(register, dispatch)	
});


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'EditRegistrationForm',
	validate
})(EditRegistrationForm));