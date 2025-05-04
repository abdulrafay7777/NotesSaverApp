import React from 'react'
import { NavLink } from 'react-router-dom'

const navbar = () => {
  return (
    <div>
          <NavLink to="/" className= 'flex flex-row gap-4'>
              Home | 
          </NavLink>

          <NavLink to="/pastes">
            Pastes
          </NavLink>
    </div>
  )
}

export default navbar
