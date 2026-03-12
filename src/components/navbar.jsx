import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import logo from '../assets/logoMPJ.png'

function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <nav>
      <a className="nav-logo" href="#">
        <img src={logo} alt="Logo" />
        <span id="nav-logo">+Educación</span>
      </a>

      <button
        className="nav-display"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      <ul className={`nav-links ${menuAbierto ? 'nav-abierto' : ''}`}>
        <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
        <li><Link to="/catalogo" onClick={() => setMenuAbierto(false)}>Catálogo</Link></li>
        <li><Link to="/admin" onClick={() => setMenuAbierto(false)}>Admin</Link></li>
        <li>
          <Link to="/donar" onClick={() => setMenuAbierto(false)}>
            <button id="btn-dona">Dona ahora</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
