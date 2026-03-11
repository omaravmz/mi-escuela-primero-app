import '../styles/footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
            <div className="footer-top">

            <div className="footer-brand">
                <div className="logo-text"><span>+</span>Educación</div>
                <p>Una iniciativa de Mexicanos Primero Jalisco para conectar escuelas con necesidades reales con personas que quieren hacer la diferencia.</p>
                <p className="footer-slogan">Mejoramos las condiciones educativas para construir una mejor sociedad.</p>
            </div>

            <div className="footer-col">
                <h4>PLATAFORMA</h4>
                <ul>
                <li><a href="#">Explorar proyectos</a></li>
                <li><a href="#">Cómo funciona</a></li>
                <li><a href="#">Transparencia</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h4>CONTACTO</h4>
                <ul>
                <li><a href="#">contacto@mpj.org.mx</a></li>
                <li><a href="#">+52 33 2106 8253</a></li>
                <li><a href="#">Prado de los Cedros #1500</a></li>
                <li><a href="#">Ciudad del Sol, Zapopan</a></li>
                </ul>
            </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
            <p>© 2025 Mexicanos Primero Jalisco · +Educación. Todos los derechos reservados.</p>
            <div className="footer-socials">
                <a className="social-btn" href="#">f</a>
                <a className="social-btn" href="#">𝕏</a>
                <a className="social-btn" href="#">ig</a>
                <a className="social-btn" href="#">yt</a>
            </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer