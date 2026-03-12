import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import necesidades from '../data/necesidades'
import aplicaciones from '../data/aplicaciones'
import '../styles/admin.css'

function Admin() {

    const [tabActiva, setTabActiva] = useState('resumen')
    const [aplicacionDetalle, setAplicacionDetalle] = useState(null)

    return (
        <>
            <Navbar />

            <main className="admin-page">
                <section className="admin-hero">
                    <div className="admin-hero-inner">
                        <div>
                            <h1 className="admin-titulo">Panel de Administración</h1>
                            <p className="admin-subtitulo">Mexicanos Primero Jalisco · +Educación</p>
                        </div>
                    </div>
                </section>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${tabActiva === 'resumen' ? 'tab-activa' : ''}`}
                        onClick={() => setTabActiva('resumen')}
                    >
                        Resumen
                    </button>
                    
                    <button
                        className={`tab-btn ${tabActiva === 'proyectos' ? 'tab-activa' : ''}`}
                        onClick={() => setTabActiva('proyectos')}
                    >
                        Proyectos
                    </button>

                    <button
                        className={`tab-btn ${tabActiva === 'aplicaciones' ? 'tab-activa' : ''}`}
                        onClick={() => setTabActiva('aplicaciones')}
                    >
                        Aplicaciones
                    </button>
                </div>

                <div className="admin-contenido">

                    {tabActiva === 'resumen' && (
                        <section className="tab-resumen">
                            <div className="resumen-grid">

                                <div className="resumen-card">
                                    <div className="resumen-icon">🏫</div>
                                    <div className="resumen-num">{necesidades.length}</div>
                                    <div className="resumen-label">Proyectos activos</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">📬</div>
                                    <div className="resumen-num">
                                        {aplicaciones.filter(a => a.estado === 'Pendiente').length}
                                    </div>
                                    <div className="resumen-label">Aplicaciones pendientes</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">✅</div>
                                    <div className="resumen-num">
                                        {aplicaciones.filter(a => a.estado === 'Completado').length}
                                    </div>
                                    <div className="resumen-label">Aplicaciones completadas</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">🔍</div>
                                    <div className="resumen-num">
                                        {aplicaciones.filter(a => a.estado === 'En revisión').length}
                                    </div>
                                    <div className="resumen-label">En revisión</div>
                                </div>

                            </div>
                        </section>
                    )}

                    {tabActiva === 'proyectos' && (
                        <section className="tab-proyectos">

                            <div className="proyectos-header">
                                <p className="tabla-count">{necesidades.length} proyectos registrados</p>
                                <button className="btn-agregar">+ Agregar proyecto</button>
                            </div>

                            <div className="tabla-wrapper">
                                <table className="tabla">
                                    <thead>
                                        <tr>
                                            <th>Escuela</th>
                                            <th>Municipio</th>
                                            <th>Categoría</th>
                                            <th>Subcategoría</th>
                                            <th>Propuesta</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {necesidades.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.escuela}</td>
                                                <td>{item.municipio}</td>
                                                <td>
                                                    <span className={`badge badge-${item.categoria.toLowerCase()}`}>
                                                        {item.categoria}
                                                    </span>
                                                </td>
                                                <td>{item.subcategoria}</td>
                                                <td>{item.propuesta}</td>
                                                <td>
                                                    <span className={`badge ${item.estado === 'Aun no cubierto'
                                                        ? 'badge-pendiente'
                                                        : 'badge-completado'}`}>
                                                        {item.estado}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="acciones">
                                                        <button className="btn-editar">Editar</button>
                                                        <button className="btn-progreso">Progreso</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </section>
                    )}

                    {tabActiva === 'aplicaciones' && (
                        <section className="tab-aplicaciones">

                            <div className="proyectos-header">
                                <p className="tabla-count">{aplicaciones.length} aplicaciones recibidas</p>
                            </div>

                            {aplicacionDetalle ? (

                                <div className="detalle-aplicacion">
                                    <button
                                        className="btn-volver"
                                        onClick={() => setAplicacionDetalle(null)}
                                    >
                                        Volver a aplicaciones
                                    </button>
                                    <h2 className="detalle-titulo">Detalle de aplicación</h2>
                                    <div className="detalle-grid">
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Nombre</span>
                                            <span className="detalle-valor">{aplicacionDetalle.nombre}</span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Instancia</span>
                                            <span className="detalle-valor">{aplicacionDetalle.instancia}</span>
                                        </div>
                                        {aplicacionDetalle.nombreInstancia && (
                                            <div className="detalle-grupo">
                                                <span className="detalle-label">Nombre de instancia</span>
                                                <span className="detalle-valor">{aplicacionDetalle.nombreInstancia}</span>
                                            </div>
                                        )}
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Correo</span>
                                            <span className="detalle-valor">{aplicacionDetalle.correo}</span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Celular</span>
                                            <span className="detalle-valor">{aplicacionDetalle.celular}</span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Municipio</span>
                                            <span className="detalle-valor">{aplicacionDetalle.municipio}</span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Tipo de donativo</span>
                                            <span className="detalle-valor">{aplicacionDetalle.tipoDonativo}</span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Escuela destino</span>
                                            <span className="detalle-valor">{aplicacionDetalle.escuelaDestino}</span>
                                        </div>
                                        {aplicacionDetalle.articulo && (
                                            <div className="detalle-grupo">
                                                <span className="detalle-label">Artículo</span>
                                                <span className="detalle-valor">{aplicacionDetalle.articulo}</span>
                                            </div>
                                        )}
                                        {aplicacionDetalle.cantidad && (
                                            <div className="detalle-grupo">
                                                <span className="detalle-label">Cantidad</span>
                                                <span className="detalle-valor">{aplicacionDetalle.cantidad}</span>
                                            </div>
                                        )}
                                        {aplicacionDetalle.temaFormacion && (
                                            <div className="detalle-grupo">
                                                <span className="detalle-label">Tema de formación</span>
                                                <span className="detalle-valor">{aplicacionDetalle.temaFormacion}</span>
                                            </div>
                                        )}
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Estado</span>
                                            <span className={`badge ${aplicacionDetalle.estado === 'Pendiente'
                                                ? 'badge-pendiente'
                                                : aplicacionDetalle.estado === 'En revisión'
                                                    ? 'badge-revision'
                                                    : 'badge-completado'}`}>
                                                {aplicacionDetalle.estado}
                                            </span>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Fecha</span>
                                            <span className="detalle-valor">{aplicacionDetalle.fecha}</span>
                                        </div>
                                    </div>
                                </div>

                            ) : (

                                <div className="tabla-wrapper">
                                    <table className="tabla">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Instancia</th>
                                                <th>Tipo de donativo</th>
                                                <th>Escuela destino</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aplicaciones.map((app) => (
                                                <tr key={app.id}>
                                                    <td>{app.nombre}</td>
                                                    <td>{app.instancia}</td>
                                                    <td>{app.tipoDonativo}</td>
                                                    <td>{app.escuelaDestino}</td>
                                                    <td>{app.fecha}</td>
                                                    <td>
                                                        <span className={`badge ${app.estado === 'Pendiente'
                                                            ? 'badge-pendiente'
                                                            : app.estado === 'En revisión'
                                                                ? 'badge-revision'
                                                                : 'badge-completado'}`}>
                                                            {app.estado}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn-editar"
                                                            onClick={() => setAplicacionDetalle(app)}
                                                        >
                                                            Ver detalle
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            )}

                        </section>
                    )}

                </div>
            </main>

            <Footer />
        </>
    )
}

export default Admin