import Footer from '../components/footer'
import Navbar from '../components/navbar'
import '../styles/home.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
    useEffect(() => {

        function animateCounter(id, target, duration = 1800) {
            const el = document.getElementById(id);
            if (!el) return;

            let start = 0;
            const step = target / (duration / 16);

            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }

                el.textContent = Math.floor(start).toLocaleString('es-MX');
            }, 16)
        }

        const statsBar = document.querySelector('.stats-bar');
        const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animateCounter('cnt-escuelas', 16);
            animateCounter('cnt-estudiantes', 2770);
            animateCounter('cnt-municipios', 4);
            animateCounter('cnt-aliados', 32);
            animateCounter('cnt-personal', 115);
            animateCounter('cnt-planteles', 12);
            observer.disconnect();
            }
        })
        }, { threshold: 0.3 });

        if (statsBar) observer.observe(statsBar)
        return () => observer.disconnect();

    }, []);

  return (
    <>
      <Navbar />

      <section className="hero">
            <div className="hero-content">
                <div className="hero-info">
                    <h1 className="hero-title">
                    <span className="plus">Mi</span> Escuela Primero
                    </h1>
                    <p className="hero-subtitle">
                    Transformamos la educación en Jalisco desde 2022. Conectamos escuelas
                    con necesidades reales con personas que quieren hacer la diferencia.
                    </p>
                    <div className="hero-ctas">
                    <Link to="/catalogo"><button className="btn-primary">Explorar escuelas</button></Link>
                    <Link to="/nosotros"><button className="btn-secondary">Conócenos</button></Link>
                    </div>
                </div>
                <div className="stats">

                </div>
            </div>
      </section>

      <section className="stats-bar">
            <div className="stats-inner">
                <div className="stat-item">
                    <span className="stat-cycle">Ciclo Escolar</span>
                    <span className="stat-year">2025–2026</span>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-escuelas">16</span>
                    <div className="stat-label">ESCUELAS</div>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-estudiantes">2,770</span>
                    <div className="stat-label">ESTUDIANTES</div>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-municipios">4</span>
                    <div className="stat-label">MUNICIPIOS</div>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-aliados">32</span>
                    <div className="stat-label">ALIADOS Y VOLUNTARIADOS</div>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-personal">115</span>
                    <div className="stat-label">PERSONAL ESCOLAR</div>
                </div>
                <div className="stat-item">
                    <span className="stat-num" id="cnt-planteles">12</span>
                    <div className="stat-label">PLANTELES</div>
                </div>
            </div>
      </section>

      <section className="como-funciona">
            <h3 className="section-label">El proceso</h3>
            <h2 className="section-title">¿Cómo funciona?</h2>
            <p className="section-subtitle">
            Un proceso simple y transparente para conectar necesidades reales
            con personas que quieren ayudar.
            </p>
            <div className="steps">
            <div className="step">
                <div className="step-icon">🏫</div>
                <div className="step-title">Escuelas publican</div>
                <div className="step-desc">Las escuelas registran sus necesidades específicas con evidencia fotográfica y documentación.</div>
            </div>
            <div className="step">
                <div className="step-icon">🔍</div>
                <div className="step-title">Donantes exploran</div>
                <div className="step-desc">Tú navegas los proyectos activos, filtras por zona o tipo de necesidad y encuentras una causa.</div>
            </div>
            <div className="step">
                <div className="step-icon">💚</div>
                <div className="step-title">Se dona directamente</div>
                <div className="step-desc">Tu donación va directamente al proyecto. Cada peso tiene un destino claro y rastreable.</div>
            </div>
            <div className="step">
                <div className="step-icon">📊</div>
                <div className="step-title">Se reporta el impacto</div>
                <div className="step-desc">Recibes actualizaciones con fotos y métricas reales del cambio generado en la escuela.</div>
            </div>
            </div>
      </section>

      <section className="sobre">
            <div className="sobre-inner">
                <div className="sobre-img-wrap">
                    <div className="sobre-img-placeholder">
                        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Sobre nosotros" className="sobre-img"/>
                    </div>
                </div>
                <div className="sobre-text">
                    <p className="section-label" style={{ textAlign: 'left' }}>Quiénes somos</p>
                    <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.7rem', marginBottom: '20px' }}>
                    Una iniciativa de Mexicanos Primero Jalisco
                    </h2>
                    <p>Somos una organización ciudadana independiente que cree que solo la educación
                    de calidad cambia a Jalisco. A través de <strong>+Educación</strong>, conectamos
                    las carencias reales de escuelas públicas con la voluntad de ciudadanos y
                    empresas que quieren aportar.</p>
                    <p>Cada proyecto en esta plataforma ha sido verificado y validado por nuestro
                    equipo para garantizar total transparencia en el uso de los recursos.</p>
                    <div className="sobre-values">
                    <div className="valor">
                        <div className="valor-title">🔍 Transparencia</div>
                        <div className="valor-desc">Cada peso rastreable y reportado</div>
                    </div>
                    <div className="valor">
                        <div className="valor-title">✅ Validación</div>
                        <div className="valor-desc">Necesidades verificadas por nuestro equipo</div>
                    </div>
                    <div className="valor">
                        <div className="valor-title">📍 Impacto local</div>
                        <div className="valor-desc">100% enfocado en Jalisco</div>
                    </div>
                    <div className="valor">
                        <div className="valor-title">💚 Comunidad</div>
                        <div className="valor-desc">Ciudadanos cambiando su entorno</div>
                    </div>
                    </div>
                </div>
            </div>
      </section>

      <Footer />
    </>
  )
}

export default Home