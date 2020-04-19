import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Firestore } from '../services/firebase'
import { AuthContext } from '../contexts/Auth'

const Home = () => {
	const { currentUser } = useContext(AuthContext)
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		let unmounted = false

		Firestore().collection("rooms")
			.where("user_id", "==", currentUser.uid)
			.orderBy("timestamp", "desc")
			.onSnapshot((docs) => {
				const data = []

				docs.forEach((doc) => {
					data.push({ id: doc.id, ...doc.data() })
				})

				if (!unmounted) {
					setRooms(data)
				}
			})

		return () => unmounted = true

	}, [currentUser.uid])

	const createRoom = (event) => {
		event.preventDefault()

		const { name } = event.target.elements

		Firestore().collection("rooms").add({
			name: name.value,
			user_id: currentUser.uid,
			timestamp: Firestore.FieldValue.serverTimestamp(),
			players: {}
		})
	}

	return (
		<main>
			<section className="row mt-3">
				<div className="col-sm-12">
					<h1>Rooms</h1>
				</div>
			</section>
			<hr />
			<form onSubmit={ createRoom }>
				<div className="input-group">
					<input name="name" className="form-control" placeholder="New room" required />
					<div className="input-group-append">
						<button className="btn btn-outline-secondary">Create Room</button>
					</div>
				</div>
			</form>
			<hr />
			<section className="row">
				{ rooms.map((room) => (
					<div key={ room.id } className="col-sm-4">
						<div className="card mb-4">
							<div className="card-body text-center">
								<h5><span className="badge badge-secondary">Room</span></h5>
								<h4 className="card-title text-truncate">{ room.name }</h4>
								<Link to={ `room/${room.id}` } className="btn btn-outline-dark btn-block">Go to room</Link>
							</div>
						</div>
					</div>
				))}
			</section>
		</main>
	);
}

export default Home