import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

// Assets


const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			<div className="nav-bar-left"> 
				<NavLink className="Home nav-a" to="/">Home</NavLink>
			</div>

			{user ? 
				<div className="nav-bar-right">
					<NavLink to="/" onClick={handleLogout}>Log Out</NavLink>
					<NavLink to="/profile">Profile</NavLink>
				</div>
			 : 
				<div className="nav-bar-right">
					<NavLink to="/login">Log In</NavLink>
					<NavLink to="/signup">Sign Up</NavLink>
				</div>	
			}
		</nav>
	)
}

export default NavBar
