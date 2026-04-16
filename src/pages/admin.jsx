import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import necesidades from '../data/necesidades'
import aplicacionesData from '../data/aplicaciones'
import '../styles/admin.css'

function Admin() {

    const [tabActiva, setTabActiva] = useState('resumen')
    const [aplicacionDetalle, setAplicacionDetalle] = useState(null)
    const [showNotifications, setShowNotifications] = useState(false)

    // Applications in state so status can be updated dynamically
    const [apps, setApps] = useState(aplicacionesData)

    // ── PROJECT FILTERS ──────────────────────────────────────────────
    const [filtroEscuela, setFiltroEscuela] = useState('')
    const [filtroMunicipio, setFiltroMunicipio] = useState('')
    const [filtroCategoria, setFiltroCategoria] = useState('')

    const proyectosFiltrados = necesidades.filter(item => {
        const matchEscuela = !filtroEscuela || item.escuela.toLowerCase().includes(filtroEscuela.toLowerCase())
        const matchMunicipio = !filtroMunicipio || item.municipio === filtroMunicipio
        const matchCategoria = !filtroCategoria || item.categoria === filtroCategoria
        return matchEscuela && matchMunicipio && matchCategoria
    })

    // ── APPLICATION FILTERS ──────────────────────────────────────────
    const [filtroEstadoApp, setFiltroEstadoApp] = useState('')
    const [filtroEscuelaApp, setFiltroEscuelaApp] = useState('')

    const appsFiltradas = apps.filter(app => {
        const matchEstado = !filtroEstadoApp || app.estado === filtroEstadoApp
        const matchEscuela = !filtroEscuelaApp || app.escuelaDestino.toLowerCase().includes(filtroEscuelaApp.toLowerCase())
        return matchEstado && matchEscuela
    })

    // ── STATUS CHANGE ────────────────────────────────────────────────
    const handleStatusChange = (id, nuevoEstado) => {
        setApps(prev => prev.map(a => a.id === id ? { ...a, estado: nuevoEstado } : a))
        if (aplicacionDetalle?.id === id) {
            setAplicacionDetalle(prev => ({ ...prev, estado: nuevoEstado }))
        }
    }

    // ── EXCEL UPLOAD ─────────────────────────────────────────────────
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadSuccess, setUploadSuccess] = useState(false)

    const handleUpload = () => {
        if (!selectedFile) return
        setUploadSuccess(true)
        setSelectedFile(null)
        setTimeout(() => setUploadSuccess(false), 4000)
    }

    // ── COMPUTED METRICS ─────────────────────────────────────────────
    const pendingApps = apps.filter(a => a.estado === 'Pendiente')
    const recentApps = [...apps].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 3)

    const byCategory = necesidades.reduce((acc, n) => {
        acc[n.categoria] = (acc[n.categoria] || 0) + 1
        return acc
    }, {})

    const byMunicipio = necesidades.reduce((acc, n) => {
        acc[n.municipio] = (acc[n.municipio] || 0) + 1
        return acc
    }, {})

    const categoryIcons = { Material: '📦', Formación: '📚', Infraestructura: '🏗️', Salud: '🏥' }

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

                        {/* Notification Bell */}
                        <div className="notification-wrapper">
                            <button
                                className="notification-bell"
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                🔔
                                {pendingApps.length > 0 && (
                                    <span className="notif-count">{pendingApps.length}</span>
                                )}
                            </button>

                            {showNotifications && (
                                <div className="notification-dropdown">
                                    <h4>Aplicaciones pendientes</h4>
                                    {pendingApps.length === 0 ? (
                                        <p className="notif-empty">No hay aplicaciones pendientes.</p>
                                    ) : (
                                        pendingApps.map(app => (
                                            <div
                                                key={app.id}
                                                className="notif-item"
                                                onClick={() => {
                                                    setTabActiva('aplicaciones')
                                                    setAplicacionDetalle(app)
                                                    setShowNotifications(false)
                                                }}
                                            >
                                                <strong>{app.nombre}</strong>
                                                <p>{app.tipoDonativo} — {app.escuelaDestino}</p>
                                                <small>{app.fecha}</small>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
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

                    <button
                        className={`tab-btn ${tabActiva === 'cargar' ? 'tab-activa' : ''}`}
                        onClick={() => setTabActiva('cargar')}
                    >
                        Cargar datos
                    </button>
                </div>

                <div className="admin-contenido">

                    {/* ── RESUMEN TAB ── */}
                    {tabActiva === 'resumen' && (
                        <section className="tab-resumen">

                            {/* Top 4 KPI cards */}
                            <div className="resumen-grid">
                                <div className="resumen-card">
                                    <div className="resumen-icon">🏫</div>
                                    <div className="resumen-num">{necesidades.length}</div>
                                    <div className="resumen-label">Proyectos activos</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">📬</div>
                                    <div className="resumen-num">
                                        {apps.filter(a => a.estado === 'Pendiente').length}
                                    </div>
                                    <div className="resumen-label">Aplicaciones pendientes</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">✅</div>
                                    <div className="resumen-num">
                                        {apps.filter(a => a.estado === 'Completado').length}
                                    </div>
                                    <div className="resumen-label">Aplicaciones completadas</div>
                                </div>

                                <div className="resumen-card">
                                    <div className="resumen-icon">🔍</div>
                                    <div className="resumen-num">
                                        {apps.filter(a => a.estado === 'En revisión').length}
                                    </div>
                                    <div className="resumen-label">En revisión</div>
                                </div>
                            </div>

                            {/* Category & municipality breakdown */}
                            <div className="resumen-secondary">

                                <div className="resumen-block">
                                    <h3 className="resumen-block-title">Proyectos por categoría</h3>
                                    <div className="resumen-mini-grid">
                                        {Object.entries(byCategory).map(([cat, count]) => (
                                            <div key={cat} className="mini-card">
                                                <span className="mini-icon">{categoryIcons[cat] || '📋'}</span>
                                                <span className="mini-num">{count}</span>
                                                <span className="mini-label">{cat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="resumen-block">
                                    <h3 className="resumen-block-title">Proyectos por municipio</h3>
                                    <div className="municipio-list">
                                        {Object.entries(byMunicipio).map(([mun, count]) => (
                                            <div key={mun} className="municipio-row">
                                                <span className="municipio-name">📍 {mun}</span>
                                                <div className="municipio-bar-wrap">
                                                    <div
                                                        className="municipio-bar"
                                                        style={{ width: `${(count / necesidades.length) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="municipio-count">{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="resumen-block">
                                    <h3 className="resumen-block-title">Aplicaciones recientes</h3>
                                    <div className="recent-apps">
                                        {recentApps.map(app => (
                                            <div
                                                key={app.id}
                                                className="recent-app-item"
                                                onClick={() => { setTabActiva('aplicaciones'); setAplicacionDetalle(app) }}
                                            >
                                                <div className="recent-app-info">
                                                    <strong>{app.nombre}</strong>
                                                    <span>{app.tipoDonativo} · {app.escuelaDestino}</span>
                                                </div>
                                                <span className={`badge ${app.estado === 'Pendiente' ? 'badge-pendiente' : app.estado === 'En revisión' ? 'badge-revision' : 'badge-completado'}`}>
                                                    {app.estado}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </section>
                    )}

                    {/* ── PROYECTOS TAB ── */}
                    {tabActiva === 'proyectos' && (
                        <section className="tab-proyectos">

                            {/* Filters */}
                            <div className="admin-filtros">
                                <input
                                    type="text"
                                    placeholder="Buscar por escuela..."
                                    value={filtroEscuela}
                                    onChange={e => setFiltroEscuela(e.target.value)}
                                    className="admin-filtro-input"
                                />
                                <select value={filtroMunicipio} onChange={e => setFiltroMunicipio(e.target.value)} className="admin-filtro-select">
                                    <option value="">Todos los municipios</option>
                                    {[...new Set(necesidades.map(n => n.municipio))].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} className="admin-filtro-select">
                                    <option value="">Todas las categorías</option>
                                    {[...new Set(necesidades.map(n => n.categoria))].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {(filtroEscuela || filtroMunicipio || filtroCategoria) && (
                                    <button className="btn-limpiar-admin" onClick={() => { setFiltroEscuela(''); setFiltroMunicipio(''); setFiltroCategoria('') }}>
                                        Limpiar
                                    </button>
                                )}
                            </div>

                            <div className="proyectos-header">
                                <p className="tabla-count">{proyectosFiltrados.length} de {necesidades.length} proyectos</p>
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
                                        {proyectosFiltrados.map((item) => (
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
                                                    <span className={`badge ${item.estado === 'En espera de apoyo'
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

                    {/* ── APLICACIONES TAB ── */}
                    {tabActiva === 'aplicaciones' && (
                        <section className="tab-aplicaciones">

                            {aplicacionDetalle ? (

                                <div className="detalle-aplicacion">
                                    <button
                                        className="btn-volver"
                                        onClick={() => setAplicacionDetalle(null)}
                                    >
                                        ← Volver a aplicaciones
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
                                            <select
                                                className={`status-select ${aplicacionDetalle.estado === 'Pendiente' ? 'status-pendiente' : aplicacionDetalle.estado === 'En revisión' ? 'status-revision' : 'status-completado'}`}
                                                value={aplicacionDetalle.estado}
                                                onChange={e => handleStatusChange(aplicacionDetalle.id, e.target.value)}
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En revisión">En revisión</option>
                                                <option value="Completado">Completado</option>
                                            </select>
                                        </div>
                                        <div className="detalle-grupo">
                                            <span className="detalle-label">Fecha</span>
                                            <span className="detalle-valor">{aplicacionDetalle.fecha}</span>
                                        </div>
                                    </div>
                                </div>

                            ) : (

                                <>
                                    {/* Filters */}
                                    <div className="admin-filtros">
                                        <input
                                            type="text"
                                            placeholder="Buscar por escuela destino..."
                                            value={filtroEscuelaApp}
                                            onChange={e => setFiltroEscuelaApp(e.target.value)}
                                            className="admin-filtro-input"
                                        />
                                        <select value={filtroEstadoApp} onChange={e => setFiltroEstadoApp(e.target.value)} className="admin-filtro-select">
                                            <option value="">Todos los estados</option>
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="En revisión">En revisión</option>
                                            <option value="Completado">Completado</option>
                                        </select>
                                        {(filtroEscuelaApp || filtroEstadoApp) && (
                                            <button className="btn-limpiar-admin" onClick={() => { setFiltroEscuelaApp(''); setFiltroEstadoApp('') }}>
                                                Limpiar
                                            </button>
                                        )}
                                    </div>

                                    <div className="proyectos-header">
                                        <p className="tabla-count">{appsFiltradas.length} de {apps.length} aplicaciones</p>
                                    </div>

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
                                                {appsFiltradas.map((app) => (
                                                    <tr key={app.id}>
                                                        <td>{app.nombre}</td>
                                                        <td>{app.instancia}</td>
                                                        <td>{app.tipoDonativo}</td>
                                                        <td>{app.escuelaDestino}</td>
                                                        <td>{app.fecha}</td>
                                                        <td>
                                                            <select
                                                                className={`status-select ${app.estado === 'Pendiente' ? 'status-pendiente' : app.estado === 'En revisión' ? 'status-revision' : 'status-completado'}`}
                                                                value={app.estado}
                                                                onChange={e => handleStatusChange(app.id, e.target.value)}
                                                            >
                                                                <option value="Pendiente">Pendiente</option>
                                                                <option value="En revisión">En revisión</option>
                                                                <option value="Completado">Completado</option>
                                                            </select>
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
                                </>

                            )}

                        </section>
                    )}

                    {/* ── CARGAR DATOS TAB ── */}
                    {tabActiva === 'cargar' && (
                        <section className="tab-cargar">
                            <div className="cargar-card">
                                <h3 className="cargar-title">Cargar necesidades desde archivo</h3>
                                <p className="cargar-desc">
                                    Sube un archivo Excel (.xlsx, .xls) o CSV con las necesidades escolares.
                                    El archivo actualizará el catálogo de proyectos.
                                </p>

                                <div className="cargar-info">
                                    <strong>El archivo debe contener las columnas:</strong>
                                    <ul>
                                        <li>escuela, municipio, categoria, subcategoria</li>
                                        <li>propuesta, cantidad, unidad, descripcion</li>
                                        <li>prioridad, progreso, beneficiarios (opcionales)</li>
                                    </ul>
                                </div>

                                <div className="cargar-form-group">
                                    <label htmlFor="archivo-datos">Seleccionar archivo</label>
                                    <input
                                        type="file"
                                        id="archivo-datos"
                                        accept=".xlsx,.xls,.csv"
                                        onChange={e => { setSelectedFile(e.target.files[0]); setUploadSuccess(false) }}
                                        className="cargar-input"
                                    />
                                </div>

                                {selectedFile && (
                                    <div className="cargar-file-info">
                                        📄 <strong>{selectedFile.name}</strong> — {(selectedFile.size / 1024).toFixed(1)} KB
                                    </div>
                                )}

                                {uploadSuccess && (
                                    <div className="cargar-success">
                                        ✅ Archivo cargado exitosamente. Los datos han sido actualizados.
                                    </div>
                                )}

                                <button
                                    className="btn-agregar"
                                    onClick={handleUpload}
                                    disabled={!selectedFile}
                                    style={{ opacity: selectedFile ? 1 : 0.5, cursor: selectedFile ? 'pointer' : 'not-allowed' }}
                                >
                                    Subir archivo
                                </button>
                            </div>
                        </section>
                    )}

                </div>
            </main>

            <Footer />
        </>
    )
}

export default Admin
