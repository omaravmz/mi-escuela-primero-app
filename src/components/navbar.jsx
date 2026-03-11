import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import logo from '../assets/logoMPJ.png'

function Navbar() {
  return (
    <nav>
        <a className="nav-logo" href="#">
            <img src={logo} alt="Logo" />
            <span id="nav-logo">+Educación</span>
        </a>
        <ul className="nav-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/donar"><button id="btn-dona">Dona ahora</button></Link></li>
        </ul>
    </nav>
  )
}

export default Navbar