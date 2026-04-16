import Navbar from '../components/navbar'
import Footer from '../components/footer'
import VerificationBadge from '../components/VerificationBadge'
import '../styles/catalog.css'
import necesidades from '../data/necesidades'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Catalog() {
  
  const [busqueda, setBusqueda] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');

  const subcategorias = categoria
    ? [...new Set(necesidades.filter(n => n.categoria === categoria).map(n => n.subcategoria))]
    : [];

  const resultados = necesidades.filter((item) => {
    const coincideBusqueda = item.escuela.toLowerCase().includes(busqueda.toLowerCase());
    const coincideMunicipio = municipio === '' || item.municipio === municipio;
    const coincideCategoria = categoria === '' || item.categoria === categoria;
    const coincideSubcategoria = subcategoria === '' || item.subcategoria === subcategoria;
    return coincideBusqueda && coincideMunicipio && coincideCategoria && coincideSubcategoria;
  })

  const limpiarFiltros = () => {
    setBusqueda('');
    setMunicipio('');
    setCategoria('');
    setSubcategoria('');
  }

  return (
    <>
      <Navbar />

      <main className="catalog-page">

        <section className="catalog-hero">
          <h1 className="catalog-titulo">Escuelas que esperan tu apoyo</h1>
          <p className="catalog-subtitulo">
            Explora los proyectos activos y encuentra una causa que te mueva a actuar.
          </p>
          <div style={{ marginTop: '16px' }}>
            <VerificationBadge />
          </div>
        </section>

        <section className="filtros-bar">
          <div className="filtros-inner">

            <div className="filtro-grupo">
              <label htmlFor="buscar">Buscar escuela</label>
              <input type="text" id="buscar" placeholder="Nombre de la escuela..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            </div>

            <div className="filtro-grupo">
              <label htmlFor="municipio">Municipio</label>
              <select id="municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
                <option value="">Todos</option>
                <option value="Arandas">Arandas</option>
                <option value="San Juan de los Lagos">San Juan de los Lagos</option>
                <option value="San Pedro Tlaquepaque">San Pedro Tlaquepaque</option>
                <option value="Zapopan">Zapopan</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" value={categoria} onChange={(e) => { setCategoria(e.target.value); setSubcategoria(''); }}>
                <option value="">Todas</option>
                <option value="Material">Material</option>
                <option value="Formación">Formación</option>
                <option value="Infraestructura">Infraestructura</option>
                <option value="Salud">Salud</option>
              </select>
            </div>

            {categoria && subcategorias.length > 0 && (
              <div className="filtro-grupo">
                <label htmlFor="subcategoria">Subcategoría</label>
                <select id="subcategoria" value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)}>
                  <option value="">Todas</option>
                  {subcategorias.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            <button className="btn-limpiar" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>

          </div>
        </section>

        <section className="catalogo-resultados">

          <div className="resultados-header">
            <p className="resultados-count">
              Mostrando <span>{resultados.length}</span> de {necesidades.length} proyectos
            </p>
          </div>

          {resultados.length > 0 ? (

            <div className="cards-grid">
              {resultados.map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-img"></div>
                  <div className="card-body">
                    <span className="card-categoria">{item.categoria}</span>
                    <h3 className="card-nombre">{item.escuela}</h3>
                    <p className="card-municipio">📍 {item.municipio}, Jalisco</p>
                    <p className="card-descripcion">{item.descripcion}</p>
                   <Link to={`/proyecto/${item.id}`} className="btn-ver">
                      Ver proyecto →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          ) : (

            <div className="sin-resultados">
              <p>No encontramos proyectos con esos criterios, pero hay muchas formas de ayudar.</p>
              <p>Prueba ajustando los filtros o <Link to="/donar">realiza una donación general</Link>.</p>
            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Catalog