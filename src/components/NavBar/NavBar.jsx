import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

// Assets


const NavBar = ({ user, handleLogout }) => {
	return (
		<nav className="nav-bar">
			{user ? (
				<>
					<NavLink className='Home nav-a' to='/'>Home</NavLink>
					<div className='user-links'>
						<NavLink className='nav-a logout' to='/' onClick={handleLogout}>Log Out</NavLink>
						<NavLink className='nav-a profile' to='/profile'>Profile</NavLink>
					</div>
				</>
			) : (
				<>
					<NavLink className='Home nav-a' to='/'>Home</NavLink>
					<div className='form-links'>
						<NavLink className='login nav-a' to="/login">Log In</NavLink>
						<NavLink className='signup nav-a' to="/signup">Sign Up</NavLink>
					</div>
				</>
			)}
		</nav>
	)
}

export default NavBar
