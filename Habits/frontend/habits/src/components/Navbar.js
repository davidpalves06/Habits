import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import {useAuthValue} from "../context/AuthContext"
import {useAuthentication} from "../hooks/useAuthentication"

const Navbar = () => {
  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className='navbar'>
        <NavLink to="/" className="habitsTitle">Habits</NavLink>
        <ul className='navList'>
            <li>
                <NavLink to="/" className="navItem">Home</NavLink>
            </li>
            {user ? (
                <>
                <li>
                <NavLink to="/dashboard" className="navItem">Dashboard</NavLink>
                </li>
                </>
            ) : (
                <>
                <li>
                <NavLink to="/login" className="navItem">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className="navItem">Register</NavLink>
                </li>
                </>
            )}
            <li>
                <NavLink to="/about" className="navItem">About</NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout} className="logoutbtn">Logout</button>
                </li>
            )}
            
        </ul>
    </nav>
  )
}

export default Navbar