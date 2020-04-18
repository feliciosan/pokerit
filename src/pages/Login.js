import React, { useContext } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'

import { Auth } from '../services/firebase'
import { AuthContext } from '../contexts/Auth'

const Login = () => {
	const { currentUser } = useContext(AuthContext)

	const handleLogin = (event) => {
		event.preventDefault()

		const { email, password } = event.target.elements

		Auth.signInWithEmailAndPassword(email.value, password.value)
	}

	if (currentUser) {
		return <Redirect to="/" />
	}

	return (
		<div>
			LOGIN
			<form onSubmit={ handleLogin }>
				<input name="email" type="email" placeholder="e-mail" required/>
				<input name="password" type="password" placeholder="password" required/>
				<button>LOGIN</button>
			</form>
			<Link to="/signup">Don't have an account?</Link>
		</div>
	);
}

export default withRouter(Login)