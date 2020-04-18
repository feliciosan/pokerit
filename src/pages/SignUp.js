import React, { useContext } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { Auth } from '../services/firebase'
import { AuthContext } from '../contexts/Auth'

const SignUp = () => {
	const { currentUser } = useContext(AuthContext)

	const handleSignUp = (event) => {
		const { email, password, displayName } = event.target.elements

		event.preventDefault()

        Auth.createUserWithEmailAndPassword(email.value, password.value).then((resp) => {
			const user = resp.user

			if (user) {
				user.updateProfile({
				   displayName: displayName.value
				})
			}
		})
	}

	if (currentUser) {
		return <Redirect to="/" />
	}

	return (
		<div>
			<h1>SignUp</h1>
			<form onSubmit={handleSignUp}>
				<input name="displayName" type="text" placeholder="Name" required/>
				<input name="email" type="email" placeholder="E-mail" required/>
				<input name="password" type="password" placeholder="Password" required/>
				<button>SIGN UP</button>
			</form>
		</div>
	);
}

export default withRouter(SignUp)