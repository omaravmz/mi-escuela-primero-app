import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import necesidades from '../data/necesidades'
import aplicacionesData from '../data/aplicaciones'
import '../styles/admin.css'

const CATEGORY_ICONS = {
  Material:       'bi-box-seam',
  Formación:      'bi-book',
  Infraestructura:'bi-building',
  Salud:          'bi-heart-pulse',
}

const KPI_ICONS = [
  { icon: 'bi-building',      color: 'var(--verde)' },
  { icon: 'bi-inbox',         color: 'var(--naranja)' },
  { icon: 'bi-check-circle',  color: 'var(--verde)' },
  { icon: 'bi-search',        color: 'var(--azul)' },
]

function Admin() {
  const [tabActiva,          setTabActiva]          = useState('resumen')
  const [aplicacionDetalle,  setAplicacionDetalle]  = useState(null)
  const [showNotifications,  setShowNotifications]  = useState(false)
  const [apps,               setApps]               = useState(aplicacionesData)
  const [proyectos,          setProyectos]          = useState(necesidades)
  const [proyectoEditar,     setProyectoEditar]     = useState(null)
  const [proyectoProgreso,   setProyectoProgreso]   = useState(null)
  const [progresoVal,        setProgresoVal]        = useState(0)
  const [editForm,           setEditForm]           = useState({})
  const [saveToast,          setSaveToast]          = useState(false)
  const notifRef = useRef(null)

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // ── Project filters ──────────────────────────────────────────────────────
  const [filtroEscuela,   setFiltroEscuela]   = useState('')
  const [filtroMunicipio, setFiltroMunicipio] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')

  const proyectosFiltrados = proyectos.filter(item => {
    const matchEscuela   = !filtroEscuela   || item.escuela.toLowerCase().includes(filtroEscuela.toLowerCase())
    const matchMunicipio = !filtroMunicipio || item.municipio === filtroMunicipio
    const matchCategoria = !filtroCategoria || item.categoria === filtroCategoria
    return matchEscuela && matchMunicipio && matchCategoria
  })

  // ── Application filters ──────────────────────────────────────────────────
  const [filtroEstadoApp, setFiltroEstadoApp] = useState('')
  const [filtroEscuelaApp,setFiltroEscuelaApp]= useState('')

  const appsFiltradas = apps.filter(app => {
    const matchEstado = !filtroEstadoApp || app.estado === filtroEstadoApp
    const matchEscuela = !filtroEscuelaApp || app.escuelaDestino.toLowerCase().includes(filtroEscuelaApp.toLowerCase())
    return matchEstado && matchEscuela
  })

  // ── Status change ────────────────────────────────────────────────────────
  const handleStatusChange = (id, nuevoEstado) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, estado: nuevoEstado } : a))
    if (aplicacionDetalle?.id === id) {
      setAplicacionDetalle(prev => ({ ...prev, estado: nuevoEstado }))
    }
  }

  // ── File upload ──────────────────────────────────────────────────────────
  const [selectedFile,  setSelectedFile]  = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleUpload = () => {
    if (!selectedFile) return
    setUploadSuccess(true)
    setSelectedFile(null)
    setTimeout(() => setUploadSuccess(false), 4000)
  }

  // ── Computed metrics ─────────────────────────────────────────────────────
  const pendingApps = apps.filter(a => a.estado === 'Pendiente')
  const recentApps  = [...apps].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 3)

  const byCategory = proyectos.reduce((acc, n) => {
    acc[n.categoria] = (acc[n.categoria] || 0) + 1
    return acc
  }, {})

  const byMunicipio = proyectos.reduce((acc, n) => {
    acc[n.municipio] = (acc[n.municipio] || 0) + 1
    return acc
  }, {})

  const kpiCards = [
    { label: 'Proyectos activos',        value: proyectos.length },
    { label: 'Aplicaciones pendientes',  value: apps.filter(a => a.estado === 'Pendiente').length },
    { label: 'Aplicaciones completadas', value: apps.filter(a => a.estado === 'Completado').length },
    { label: 'En revisión',              value: apps.filter(a => a.estado === 'En revisión').length },
  ]

  // ── Edit handlers ────────────────────────────────────────────────────────
  const openEditar = (item) => {
    setEditForm({ ...item })
    setProyectoEditar(item)
    setProyectoProgreso(null)
  }

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = () => {
    setProyectos(prev => prev.map(p => p.id === editForm.id ? { ...editForm } : p))
    setProyectoEditar(null)
    showToast()
  }

  // ── Progress handlers ────────────────────────────────────────────────────
  const openProgreso = (item) => {
    setProgresoVal(item.progreso ?? 0)
    setProyectoProgreso(item)
    setProyectoEditar(null)
  }

  const handleSaveProgreso = () => {
    setProyectos(prev => prev.map(p => p.id === proyectoProgreso.id ? { ...p, progreso: progresoVal } : p))
    setProyectoProgreso(null)
    showToast()
  }

  const showToast = () => {
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3000)
  }

  const TABS = [
    { key: 'resumen',       icon: 'bi-grid-1x2', label: 'Resumen' },
    { key: 'proyectos',     icon: 'bi-building', label: 'Proyectos' },
    { key: 'aplicaciones',  icon: 'bi-inbox',    label: 'Aplicaciones' },
    { key: 'cargar',        icon: 'bi-upload',   label: 'Cargar datos' },
  ]

  return (
    <>
      <Navbar />

      <main className="admin-page">

        {/* ── Hero ── */}
        <section className="admin-hero">
          <div className="admin-hero-inner">
            <div>
              <h1 className="admin-titulo">Panel de Administración</h1>
              <p className="admin-subtitulo">Mexicanos Primero Jalisco · +Educación</p>
            </div>

            {/* Notification Bell */}
            <div className="notification-wrapper" ref={notifRef}>
              <button
                className="notification-bell"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label={`Notificaciones${pendingApps.length > 0 ? ` — ${pendingApps.length} pendientes` : ''}`}
                aria-expanded={showNotifications}
              >
                <i className="bi bi-bell-fill" aria-hidden="true" />
                {pendingApps.length > 0 && (
                  <span className="notif-count" aria-hidden="true">{pendingApps.length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notification-dropdown" role="menu">
                  <h4>Aplicaciones pendientes</h4>
                  {pendingApps.length === 0 ? (
                    <p className="notif-empty">No hay aplicaciones pendientes.</p>
                  ) : (
                    pendingApps.map(app => (
                      <div
                        key={app.id}
                        className="notif-item"
                        role="menuitem"
                        tabIndex={0}
                        onClick={() => {
                          setTabActiva('aplicaciones')
                          setAplicacionDetalle(app)
                          setShowNotifications(false)
                        }}
                        onKeyDown={e => e.key === 'Enter' && e.currentTarget.click()}
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

        {/* ── Tabs ── */}
        <div className="admin-tabs" role="tablist">
          {TABS.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tabActiva === t.key}
              className={`tab-btn${tabActiva === t.key ? ' tab-activa' : ''}`}
              onClick={() => setTabActiva(t.key)}
            >
              <i className={`bi ${t.icon} me-2`} aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin-contenido">

          {/* ── RESUMEN ── */}
          {tabActiva === 'resumen' && (
            <section className="tab-resumen">

              <div className="resumen-grid">
                {kpiCards.map((card, i) => (
                  <div className="resumen-card" key={i}>
                    <div className="resumen-icon" style={{ color: KPI_ICONS[i].color }}>
                      <i className={`bi ${KPI_ICONS[i].icon}`} aria-hidden="true" />
                    </div>
                    <div className="resumen-num">{card.value}</div>
                    <div className="resumen-label">{card.label}</div>
                  </div>
                ))}
              </div>

              <div className="resumen-secondary">

                {/* By category */}
                <div className="resumen-block">
                  <h3 className="resumen-block-title">Proyectos por categoría</h3>
                  <div className="resumen-mini-grid">
                    {Object.entries(byCategory).map(([cat, count]) => (
                      <div key={cat} className="mini-card">
                        <i className={`bi ${CATEGORY_ICONS[cat] || 'bi-grid'} mini-icon`} aria-hidden="true" />
                        <span className="mini-num">{count}</span>
                        <span className="mini-label">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* By municipio */}
                <div className="resumen-block">
                  <h3 className="resumen-block-title">Proyectos por municipio</h3>
                  <div className="municipio-list">
                    {Object.entries(byMunicipio).map(([mun, count]) => (
                      <div key={mun} className="municipio-row">
                        <span className="municipio-name">
                          <i className="bi bi-geo-alt-fill me-1" aria-hidden="true" />
                          {mun}
                        </span>
                        <div
                          className="municipio-bar-wrap"
                          role="progressbar"
                          aria-valuenow={count}
                          aria-valuemax={necesidades.length}
                          aria-label={`${mun}: ${count} proyectos`}
                        >
                          <div
                            className="municipio-bar"
                            style={{ width: `${(count / necesidades.length) * 100}%` }}
                          />
                        </div>
                        <span className="municipio-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent applications */}
                <div className="resumen-block">
                  <h3 className="resumen-block-title">Aplicaciones recientes</h3>
                  <div className="recent-apps">
                    {recentApps.map(app => (
                      <div
                        key={app.id}
                        className="recent-app-item"
                        role="button"
                        tabIndex={0}
                        onClick={() => { setTabActiva('aplicaciones'); setAplicacionDetalle(app) }}
                        onKeyDown={e => e.key === 'Enter' && e.currentTarget.click()}
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

          {/* ── PROYECTOS ── */}
          {tabActiva === 'proyectos' && (
            <section className="tab-proyectos">

              {/* ── Edit panel (full-tab view) ── */}
              {proyectoEditar ? (
                <div className="panel-editar">
                  <button className="btn-volver" onClick={() => setProyectoEditar(null)}>
                    <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                    Volver a proyectos
                  </button>
                  <h2 className="panel-title">
                    <i className="bi bi-pencil-square" aria-hidden="true" />
                    Editar proyecto
                  </h2>
                  <div className="panel-form-grid">
                    <div className="panel-group">
                      <label>Escuela</label>
                      <input value={editForm.escuela || ''} onChange={e => handleEditChange('escuela', e.target.value)} />
                    </div>
                    <div className="panel-group">
                      <label>Municipio</label>
                      <input value={editForm.municipio || ''} onChange={e => handleEditChange('municipio', e.target.value)} />
                    </div>
                    <div className="panel-group">
                      <label>Categoría</label>
                      <select value={editForm.categoria || ''} onChange={e => handleEditChange('categoria', e.target.value)}>
                        <option value="Material">Material</option>
                        <option value="Formación">Formación</option>
                        <option value="Infraestructura">Infraestructura</option>
                        <option value="Salud">Salud</option>
                      </select>
                    </div>
                    <div className="panel-group">
                      <label>Subcategoría</label>
                      <input value={editForm.subcategoria || ''} onChange={e => handleEditChange('subcategoria', e.target.value)} />
                    </div>
                    <div className="panel-group">
                      <label>Prioridad</label>
                      <select value={editForm.prioridad || ''} onChange={e => handleEditChange('prioridad', e.target.value)}>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>
                    <div className="panel-group">
                      <label>Beneficiarios</label>
                      <input type="number" value={editForm.beneficiarios || ''} onChange={e => handleEditChange('beneficiarios', Number(e.target.value))} />
                    </div>
                    <div className="panel-group full-width">
                      <label>Propuesta</label>
                      <input value={editForm.propuesta || ''} onChange={e => handleEditChange('propuesta', e.target.value)} />
                    </div>
                    <div className="panel-group full-width">
                      <label>Descripción</label>
                      <textarea value={editForm.descripcion || ''} onChange={e => handleEditChange('descripcion', e.target.value)} />
                    </div>
                  </div>
                  <div className="panel-actions">
                    <button className="btn-cancelar" onClick={() => setProyectoEditar(null)}>Cancelar</button>
                    <button className="btn-guardar" onClick={handleSaveEdit}>
                      <i className="bi bi-check-lg me-1" aria-hidden="true" />
                      Guardar cambios
                    </button>
                  </div>
                  {saveToast && (
                    <div className="panel-save-toast">
                      <i className="bi bi-check-circle-fill" aria-hidden="true" />
                      Cambios guardados correctamente.
                    </div>
                  )}
                </div>

              ) : proyectoProgreso ? (

                /* ── Progress panel (full-tab view) ── */
                <div className="panel-progreso">
                  <button className="btn-volver" onClick={() => setProyectoProgreso(null)}>
                    <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                    Volver a proyectos
                  </button>
                  <h2 className="panel-title">
                    <i className="bi bi-bar-chart-line" aria-hidden="true" />
                    Actualizar progreso
                  </h2>
                  <p className="progreso-proyecto-name">{proyectoProgreso.propuesta}</p>
                  <p className="progreso-escuela">
                    <i className="bi bi-building me-1" aria-hidden="true" />
                    {proyectoProgreso.escuela} · {proyectoProgreso.municipio}
                  </p>
                  <div className="progreso-bar-preview">
                    <div className="progreso-bar-fill" style={{ width: `${progresoVal}%` }} />
                  </div>
                  <p className="progreso-label">{progresoVal}% completado</p>
                  <div className="progreso-slider-row">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progresoVal}
                      onChange={e => setProgresoVal(Number(e.target.value))}
                      className="progreso-slider"
                      aria-label="Porcentaje de progreso"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={progresoVal}
                      onChange={e => setProgresoVal(Math.min(100, Math.max(0, Number(e.target.value))))}
                      className="progreso-number"
                      aria-label="Valor de progreso"
                    />
                  </div>
                  <div className="panel-actions">
                    <button className="btn-cancelar" onClick={() => setProyectoProgreso(null)}>Cancelar</button>
                    <button className="btn-guardar" onClick={handleSaveProgreso}>
                      <i className="bi bi-check-lg me-1" aria-hidden="true" />
                      Guardar progreso
                    </button>
                  </div>
                  {saveToast && (
                    <div className="panel-save-toast">
                      <i className="bi bi-check-circle-fill" aria-hidden="true" />
                      Progreso guardado correctamente.
                    </div>
                  )}
                </div>

              ) : (
                <>
                  <div className="admin-filtros">
                    <input
                      type="search"
                      placeholder="Buscar por escuela..."
                      value={filtroEscuela}
                      onChange={e => setFiltroEscuela(e.target.value)}
                      className="admin-filtro-input"
                      aria-label="Buscar escuela"
                    />
                    <select
                      value={filtroMunicipio}
                      onChange={e => setFiltroMunicipio(e.target.value)}
                      className="admin-filtro-select"
                      aria-label="Filtrar por municipio"
                    >
                      <option value="">Todos los municipios</option>
                      {[...new Set(proyectos.map(n => n.municipio))].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={filtroCategoria}
                      onChange={e => setFiltroCategoria(e.target.value)}
                      className="admin-filtro-select"
                      aria-label="Filtrar por categoría"
                    >
                      <option value="">Todas las categorías</option>
                      {[...new Set(proyectos.map(n => n.categoria))].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {(filtroEscuela || filtroMunicipio || filtroCategoria) && (
                      <button
                        className="btn-limpiar-admin"
                        onClick={() => { setFiltroEscuela(''); setFiltroMunicipio(''); setFiltroCategoria('') }}
                      >
                        <i className="bi bi-x-circle me-1" aria-hidden="true" />
                        Limpiar
                      </button>
                    )}
                  </div>

                  {saveToast && (
                    <div className="panel-save-toast">
                      <i className="bi bi-check-circle-fill" aria-hidden="true" />
                      Cambios guardados correctamente.
                    </div>
                  )}

                <div className="proyectos-header">
                <p className="tabla-count">{proyectosFiltrados.length} de {proyectos.length} proyectos</p>
                <button className="btn-agregar">
                  <i className="bi bi-plus-lg me-1" aria-hidden="true" />
                  Agregar proyecto
                </button>
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
                    {proyectosFiltrados.map(item => (
                      <tr key={item.id}>
                        <td>{item.escuela}</td>
                        <td>{item.municipio}</td>
                        <td>
                          <span className={`badge badge-${item.categoria.toLowerCase().replace('ó', 'o')}`}>
                            <i className={`bi ${CATEGORY_ICONS[item.categoria] || 'bi-grid'} me-1`} aria-hidden="true" />
                            {item.categoria}
                          </span>
                        </td>
                        <td>{item.subcategoria}</td>
                        <td>{item.propuesta}</td>
                        <td>
                          <span className={`badge ${item.estado === 'En espera de apoyo' ? 'badge-pendiente' : 'badge-completado'}`}>
                            {item.estado}
                          </span>
                        </td>
                        <td>
                          <div className="acciones">
                            <button className="btn-editar" onClick={() => openEditar(item)}>
                              <i className="bi bi-pencil me-1" aria-hidden="true" />
                              Editar
                            </button>
                            <button className="btn-progreso" onClick={() => openProgreso(item)}>
                              <i className="bi bi-bar-chart-line me-1" aria-hidden="true" />
                              Progreso
                            </button>
                          </div>
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

          {/* ── APLICACIONES ── */}
          {tabActiva === 'aplicaciones' && (
            <section className="tab-aplicaciones">
              {aplicacionDetalle ? (

                <div className="detalle-aplicacion">
                  <button
                    className="btn-volver"
                    onClick={() => setAplicacionDetalle(null)}
                  >
                    <i className="bi bi-arrow-left me-1" aria-hidden="true" />
                    Volver a aplicaciones
                  </button>
                  <h2 className="detalle-titulo">Detalle de aplicación</h2>
                  <div className="detalle-grid">
                    {[
                      ['Nombre',           aplicacionDetalle.nombre],
                      ['Instancia',        aplicacionDetalle.instancia],
                      aplicacionDetalle.nombreInstancia ? ['Nombre de instancia', aplicacionDetalle.nombreInstancia] : null,
                      ['Correo',           aplicacionDetalle.correo],
                      ['Celular',          aplicacionDetalle.celular],
                      ['Municipio',        aplicacionDetalle.municipio],
                      ['Tipo de donativo', aplicacionDetalle.tipoDonativo],
                      ['Escuela destino',  aplicacionDetalle.escuelaDestino],
                      aplicacionDetalle.articulo ? ['Artículo', aplicacionDetalle.articulo] : null,
                      aplicacionDetalle.cantidad  ? ['Cantidad', aplicacionDetalle.cantidad]  : null,
                      aplicacionDetalle.temaFormacion ? ['Tema de formación', aplicacionDetalle.temaFormacion] : null,
                      ['Fecha',            aplicacionDetalle.fecha],
                    ].filter(Boolean).map(([label, value]) => (
                      <div className="detalle-grupo" key={label}>
                        <span className="detalle-label">{label}</span>
                        <span className="detalle-valor">{value}</span>
                      </div>
                    ))}
                    <div className="detalle-grupo">
                      <span className="detalle-label">Estado</span>
                      <select
                        className={`status-select ${aplicacionDetalle.estado === 'Pendiente' ? 'status-pendiente' : aplicacionDetalle.estado === 'En revisión' ? 'status-revision' : 'status-completado'}`}
                        value={aplicacionDetalle.estado}
                        onChange={e => handleStatusChange(aplicacionDetalle.id, e.target.value)}
                        aria-label="Cambiar estado de aplicación"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En revisión">En revisión</option>
                        <option value="Completado">Completado</option>
                      </select>
                    </div>
                  </div>
                </div>

              ) : (

                <>
                  <div className="admin-filtros">
                    <input
                      type="search"
                      placeholder="Buscar por escuela destino..."
                      value={filtroEscuelaApp}
                      onChange={e => setFiltroEscuelaApp(e.target.value)}
                      className="admin-filtro-input"
                      aria-label="Buscar escuela destino"
                    />
                    <select
                      value={filtroEstadoApp}
                      onChange={e => setFiltroEstadoApp(e.target.value)}
                      className="admin-filtro-select"
                      aria-label="Filtrar por estado"
                    >
                      <option value="">Todos los estados</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En revisión">En revisión</option>
                      <option value="Completado">Completado</option>
                    </select>
                    {(filtroEscuelaApp || filtroEstadoApp) && (
                      <button
                        className="btn-limpiar-admin"
                        onClick={() => { setFiltroEscuelaApp(''); setFiltroEstadoApp('') }}
                      >
                        <i className="bi bi-x-circle me-1" aria-hidden="true" />
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
                        {appsFiltradas.map(app => (
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
                                aria-label={`Estado de ${app.nombre}`}
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
                                <i className="bi bi-eye me-1" aria-hidden="true" />
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

          {/* ── CARGAR DATOS ── */}
          {tabActiva === 'cargar' && (
            <section className="tab-cargar">
              <div className="cargar-card">
                <h3 className="cargar-title">
                  <i className="bi bi-file-earmark-spreadsheet me-2" aria-hidden="true" />
                  Cargar necesidades desde archivo
                </h3>
                <p className="cargar-desc">
                  Sube un archivo Excel (.xlsx, .xls) o CSV con las necesidades escolares.
                  El archivo actualizará el catálogo de proyectos.
                </p>

                <div className="cargar-info">
                  <strong>
                    <i className="bi bi-info-circle me-1" aria-hidden="true" />
                    El archivo debe contener las columnas:
                  </strong>
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
                    <i className="bi bi-file-earmark me-2" aria-hidden="true" />
                    <strong>{selectedFile.name}</strong>
                    <span className="ms-2 text-muted">— {(selectedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="cargar-success" role="status">
                    <i className="bi bi-check-circle-fill me-2" aria-hidden="true" />
                    Archivo cargado exitosamente. Los datos han sido actualizados.
                  </div>
                )}

                <button
                  className="btn-agregar"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  <i className="bi bi-upload me-2" aria-hidden="true" />
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
