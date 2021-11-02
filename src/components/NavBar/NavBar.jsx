import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

// Assets


const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-bar-left"> 
				<NavLink className="Home nav-a" activeStyle={{ color: 'red'}} to="/">Home</NavLink>
			</div>

			{user ? 
				<div className="nav-bar-right">
					<NavLink activeStyle={{ color: 'red'}} to="/" onClick={handleLogout}>Log Out</NavLink>
					<NavLink activeStyle={{ color: 'red'}} to="/profile">Profile</NavLink>
				</div>
			 : 
				<div className="nav-bar-right">
					<NavLink activeStyle={{ color: 'red'}} to="/login">Log In</NavLink>
					<NavLink activeStyle={{ color: 'red'}} to="/signup">Sign Up</NavLink>
				</div>	
			}
		</nav>
	)
}

export default NavBar
