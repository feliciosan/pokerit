import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from "../contexts/Auth"

import { Auth } from '../services/firebase'

const Header = () => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);

    const handleSignOut = () => {
        Auth.signOut().then(() => {
            localStorage.removeItem('user_id')
            history.push('/')
        })
    }

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">POKERIT</Link>
                    { currentUser && (
                        <>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                            </ul>
                            <button onClick={ handleSignOut } className="btn btn-danger my-2 my-sm-0">Sign out</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header
