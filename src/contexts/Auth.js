import React, { createContext, useEffect, useState } from 'react'
import { Auth } from '../services/firebase'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [isPending, setPending] = useState(true)

	useEffect(() => {
		let unmounted = false;

		Auth.onAuthStateChanged((user) => {
			if (!unmounted) {
				setCurrentUser(user)
				setPending(false)
			}
		});

		return () => unmounted = true
	}, [])

	if (isPending) {
		return (
			<h1>Loading...</h1>
		)
	}

	return (
		<AuthContext.Provider value={{ currentUser, isPending }}>
			{ children }
		</AuthContext.Provider>
	)
}