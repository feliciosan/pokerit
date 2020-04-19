import React, { useContext, useState } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'

import { Auth } from '../services/firebase'
import { AuthContext } from '../contexts/Auth'

const Login = () => {
	const { currentUser } = useContext(AuthContext)
	const [error, setError] = useState(null)

	const handleLogin = (event) => {
		event.preventDefault()

		const { email, password } = event.target.elements

		Auth.signInWithEmailAndPassword(email.value, password.value)
		.catch((error) => {
			setError(error.message)
		})
	}

	if (currentUser) {
		return <Redirect to="/" />
	}

	return (
		<div className="col-sm-6 offset-sm-3 mt-5">
			<div className="card">
				<div className="card-body">
					{ error && (
						<div className="alert alert-danger">{ error }</div>
					)}
					<h1>Login</h1>
					<hr />
					<form onSubmit={ handleLogin }>
						<div className="form-group">
							<label htmlFor="inputEmail">Email address</label>
							<input name="email" type="email" className="form-control" id="inputEmail" placeholder="Enter email" />
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword">Password</label>
							<input name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" />
						</div>
						<button className="btn btn-block btn-primary">Login</button>
					</form>
					<Link to="/signup" className="mt-2 d-block">Don't have an account?</Link>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login)