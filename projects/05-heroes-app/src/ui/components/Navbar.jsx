import { useContext } from 'react'

import { Link, NavLink, useNavigate } from 'react-router'
import { AuthContext } from '../../auth/context'

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/login', {
      replace: true
    })
  }

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark p-2'>
      <Link to='/' className='navbar-brand'>
        Asociaciones
      </Link>

      <div className='navbar-collapse'>
        <div className='navbar-nav'>
          <NavLink
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            to='/marvel'
          >
            Marvel
          </NavLink>

          <NavLink
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            to='/dc'
          >
            DC
          </NavLink>

          <NavLink
            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            to='/search'
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end'>
        <ul className='navbar-nav ml-auto'>
          <span
            className='nav-item nav-link text-primary'
            aria-label='user-name'
          >
            {user?.name}
          </span>

          <button
            className='nav-item nav-link btn'
            onClick={handleLogout}
            aria-label='logout-button'
          >
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}
