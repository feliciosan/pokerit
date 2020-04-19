import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/Auth'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Room from './pages/Room'
import NotFound from './pages/NotFound'
import PrivateRoute from './PrivateRoute'
import Header from './components/Header'

import './styles/Base.scss'

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<div className="container">
					<Switch>
						<PrivateRoute exact path="/" component={Home}/>
						<Route exat path="/room/:id" component={Room}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/signup" component={SignUp}/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
