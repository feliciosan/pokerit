import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Firestore } from '../services/firebase'
import { AuthContext } from '../contexts/Auth'

const generateCardNumbers = (card = 0.5, limit = 28) => {
	const cards = []
	let interval = 0.5

	while (card <= limit) {
		if (card >= 5) {
			interval = 1
		}

		cards.push(card)
	  	card = (card + interval)
	}

	return cards
}

const getLocalStorageUserKey = (roomId) => {
	const localStorageUserId = localStorage.getItem('user_id')

	if (!localStorageUserId || (roomId !== localStorageUserId.split('_')[1])) {
		return null
	}

	return localStorageUserId
}

const setLocalStorageUserKey = (userId, roomId) => {
	localStorage.setItem('user_id', `${userId}_${roomId}`)
}

const FormPlayer = ({ submit }) => {
	return (
		<form onSubmit={ submit }>
			<div className="input-group">
				<input name="name" className="form-control" placeholder="Username" required />
				<div className="input-group-append">
					<button className="btn btn-outline-secondary">Join</button>
				</div>
			</div>
			<hr />
		</form>
	)
}

const Cards = ({ updateCard }) => {
	const [cards] = useState(generateCardNumbers())

	return (
		<div className="mb-4 col-12">
			<div className="card">
				<div className="card-body d-flex flex-wrap">
				{cards.map((card) => (
					<button
						key={card}
						onClick={() => updateCard(card)}
						className="btn btn-outline-danger m-1 pl-4 pr-4 pt-3 pb-3 flex-grow-1">
						<strong>{card}</strong>
					</button>
				))}
				</div>
			</div>
		</div>
	)
}

const Players = ({ room, userId }) => {
	return (
		<ul className="list-group">
			{Object.keys(room.players).sort().map((key) => (
				<li key={key} className="list-group-item d-flex justify-content-between align-items-center">
					{room.players[key].name}
					<span className={`badge ${(room.show_result || (userId === key) ? 'badge-success' : 'badge-danger')} badge-pill`}>
						{(room.show_result || (userId === key) ? room.players[key].card : '?')}
					</span>
				</li>
			))}
		</ul>
	)
}

const Room = () => {
	const { id } = useParams();
	const { currentUser } = useContext(AuthContext)
	const [room, setRoom] = useState({ players: {} })
	const [average, setAverage] = useState(0)
	const [userId, setUserId] = useState(getLocalStorageUserKey(id))

	const updateCard = (val) => {
		const data = {};
		const docRef = Firestore().collection("rooms").doc(id)
		const currentPlayerCard = `players.${userId}.card`

		data[currentPlayerCard] = val
		docRef.update(data)
	}

	const generatePlayer = (user, val) => {
		const data = {};
		const currentPlayer = `players.${user.id}`

		data[currentPlayer] = {}

		if (user.name) {
			data[currentPlayer].name = user.name
		}

		data[currentPlayer].card = val || 0

		return data
	}

	const handleEnter = (event) => {
		event.preventDefault()

		const {name} = event.target.elements
		const docRef = Firestore().collection("rooms").doc(id)
		const newUserId = (currentUser ? currentUser.uid : (Math.random() * 10).toString().replace('.', ''))
		const userKey = `${newUserId}_${id}`;
		const player = generatePlayer({
			id: userKey,
			name: name.value
		})

		docRef.update(player).then(() => {
			setUserId(userKey)
			setLocalStorageUserKey(newUserId, id)
		})

	}

	const showAllCards = (show) => {
		const docRef = Firestore().collection("rooms").doc(id)

		docRef.update({
			show_result: show
		})
	}

	const calcAvarage = (currentRoom) => {
		if (!currentRoom.show_result) {
			return;
		}

		const players = Object.values(currentRoom.players)
		let sum = 0

		players.forEach((player) => {
			sum += player.card
		})

		setAverage(sum / players.length)
	}

	useEffect(() => {
		const docRef = Firestore().collection("rooms").doc(id)

		docRef.onSnapshot((doc) => {
			if (doc.exists) {
				const currentRoom = doc.data();

				if (currentRoom.show_result) {
					calcAvarage(currentRoom)
				}

				setRoom(currentRoom)
			}
		})

	}, [id])

	return (
		<main>
			<section className="row mt-3">
				<div className="col-sm-12">
					<h1>{room.name}</h1>
				</div>
			</section>
			<hr />
			{ !userId ? (
				<FormPlayer submit={ handleEnter }/>
			) : (
				<div className="row">
					<Cards updateCard={ updateCard }/>
					<hr />
					<section className="col-sm-12">
						<div className="card mb-4">
							<div className={`card-body ${!currentUser && 'text-center'}`}>
								<h5 className={`mt-1 ${currentUser && 'float-left'} ${(room.show_result ? 'text-success' : 'text-danger')}`}>Average: {room.show_result ? average.toFixed(2) : '?'}</h5>
								{ currentUser && (room.user_id === currentUser.uid) && (
									<button onClick={() => showAllCards(!room.show_result)} className="btn btn-outline-secondary float-right">
										{!room.show_result ? 'Show result' : 'Hide result'}
									</button>
								)}
							</div>
						</div>
						<Players room={ room } userId={ userId }/>
					</section>
				</div>
			)}
		</main>
	);
}

export default Room