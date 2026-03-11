import { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/form.css'

function Form() {

    // ── ESTADOS PARA CONTROLAR LA VISIBILIDAD DE CAMPOS ──
    const [entityType, setEntityType] = useState('');
    const showInstanceGroup = entityType !== '' && entityType !== 'ninguna';

    // El tipo de donativo seleccionado determina qué campos de detalles mostrar
    const [donationType, setDonationType] = useState('');
    const showDetailsSection = donationType !== '';

    // Grupos de tipos para saber qué campos mostrar en detalles
    const isFormacion = ['formacion-familias', 'formacion-estudiantes', 'formacion-docentes'].includes(donationType);
    const isAtencion = donationType === 'psicologia';
    const isMaterial = ['material-tecnologico', 'material-papeleria', 'material-literario', 'material-ed-fisica', 'material-infraestructura', 'mobiliario'].includes(donationType);
    const isOther = !isFormacion && !isMaterial && donationType !== '';

    const [logistics, setLogistics] = useState('');
    const showAddressGroup = logistics === 'recoleccion';

    // ── MANEJO DEL ENVÍO ─────────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('¡Gracias por ser parte del cambio! Nos pondremos en contacto contigo en menos de 48 horas.');
    };

    return (
        <>

        <Navbar />

        <main className="form-page">

            <section className="form-hero">
            <h1 className="form-title">Sé parte del cambio</h1>
            <p className="form-subtitle">
                Completa el formulario y en menos de 48 horas nos pondremos en contacto contigo.
            </p>
            </section>

            <section className="form-container">
            <form className="form" onSubmit={handleSubmit} noValidate>

                <div className="form-section" id="contact-section">
                <h2 className="form-section-title">1. Tus datos de contacto</h2>

                <div className="form-group">
                    <label htmlFor="full-name">Nombre completo *</label>
                    <input type="text" id="full-name" name="full-name" placeholder="Ej. Diego Rodríguez Romero" required />
                </div>

                <div className="form-group">
                    <label htmlFor="entity-type">Tipo de instancia *</label>
                    <select id="entity-type" name="entity-type" required value = {entityType} onChange={(e) => setEntityType(e.target.value)}>
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="empresa">Empresa</option>
                        <option value="osc">Organización de la sociedad civil</option>
                        <option value="educativa">Institución educativa</option>
                        <option value="gobierno">Gobierno municipal</option>
                        <option value="ninguna">No represento una instancia</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                {showInstanceGroup && (
                    <div className="form-group">
                        <label htmlFor="instance-name">Nombre de la instancia</label>
                        <input type="text" id="instance-name" name="instance-name" placeholder="Ej. Empresa Tecnológica S.A." />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico *</label>
                    <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Celular de contacto *</label>
                    <input type="tel" id="phone" name="phone" placeholder="33 1234 5678" required />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Municipio y estado *</label>
                    <input type="text" id="location" name="location" placeholder="Ej. Zapopan, Jalisco" required />
                </div>
                </div>


                <div className="form-section" id="donation-section">
                <h2 className="form-section-title">2. Tipo de donativo</h2>

                <div className="form-group">
                    <label htmlFor="donation-type">¿Qué deseas donar? *</label>
                    <select id="donation-type" name="donation-type" required value={donationType} onChange={(e) => setDonationType(e.target.value)}>
                        <option value="" disabled>Selecciona una opción</option>
                        <optgroup label="Formación">
                            <option value="formacion-familias">Formación para familias</option>
                            <option value="formacion-estudiantes">Formación para estudiantes</option>
                            <option value="formacion-docentes">Formación a docentes</option>
                        </optgroup>

                        <optgroup label="Apoyo especializado">
                            <option value="psicologia">Atención psicológica para estudiantes</option>
                        </optgroup>

                        <optgroup label="Material">
                            <option value="material-tecnologico">Material tecnológico</option>
                            <option value="material-papeleria">Material de papelería</option>
                            <option value="material-literario">Material literario</option>
                            <option value="material-ed-fisica">Material de educación física</option>
                            <option value="material-infraestructura">Material de infraestructura</option>
                            <option value="mobiliario">Mobiliario</option>
                        </optgroup>
                        
                        <optgroup label="Otros apoyos">
                            <option value="transporte">Transporte</option>
                            <option value="camino">Condiciones del camino</option>
                            <option value="salud">Salud física</option>
                            <option value="visitas">Visitas extraescolares</option>
                            <option value="gestion">Apoyo en gestión</option>
                            <option value="otro">Otro</option>
                        </optgroup>
                    </select>
                </div>
                </div>

                {showDetailsSection && (
                <div className="form-section" id="details-section">
                    <h2 className="form-section-title">3. Detalles del donativo</h2>

                    <div className="form-group">
                        <label htmlFor="destination-school">Escuela(s) destino *</label>
                        <input type="text" id="destination-school" name="destination-school" placeholder="Nombre de la escuela" required />
                    </div>

                    {isFormacion && (
                    <>                   
                        <div className="form-group">
                            <label htmlFor="training-topic">Tema de formación *</label>
                            <input type="text" id="training-topic" name="training-topic" placeholder="Ej. Escritura, matemáticas..." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="audience">Público al que va dirigido *</label>
                            <select id="audience" name="audience">
                                <option value="" disabled>Selecciona</option>
                                <option value="estudiantes">Estudiantes</option>
                                <option value="docentes">Docentes</option>
                                <option value="familias">Familias</option>
                                <option value="todos">Todos</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="hours">Número de horas y/o sesiones *</label>
                            <input type="text" id="hours" name="hours" placeholder="Ej. 3 sesiones de 2 horas" />
                        </div>
                    </>
                    )}

                    {isMaterial && (
                    <>
                        <div className="form-group">
                            <label htmlFor="item">Artículo a donar *</label>
                            <input type="text" id="item" name="item" placeholder="Ej. Sillas escolares, libros, etc." />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Cantidad de artículos *</label>
                            <input type="number" id="quantity" name="quantity" placeholder="Ej. 20" min="1" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="logistics">Logística de entrega *</label>
                            <select id="logistics" name="logistics" value={logistics} onChange={(e) => setLogistics(e.target.value)}>
                                <option value="" disabled>Selecciona</option>
                                <option value="flete-escuela">Puedo llevar flete hasta la escuela</option>
                                <option value="oficina">Lo llevo a la oficina de MPJ</option>
                                <option value="recoleccion">Necesito que pasen por ello</option>
                            </select>
                        </div>

                        {showAddressGroup && (
                        <div className="form-group">
                            <label htmlFor="address">Dirección de recolección *</label>
                            <input type="text" id="address" name="address" placeholder="Calle, número, colonia, ciudad" />
                        </div>
                        )}
                    </>
                    )}

                    {isOther && (
                    <div className="form-group">
                        <label htmlFor="support-description">Descripción del apoyo *</label>
                        <textarea id="support-description" name="support-description" rows="4" placeholder="Describe brevemente el apoyo que deseas ofrecer...">
                        </textarea>
                    </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="attachment">Documento o imagen adjunta (opcional)</label>
                        <input type="file" id="attachment" name="attachment" accept=".pdf,.jpg,.jpeg,.png" />
                        <span className="form-hint">Formatos permitidos: PDF, JPG, PNG</span>
                    </div>

                </div>
                )}

                <div className="form-section" id="privacy-section">
                <h2 className="form-section-title">4. Aviso de privacidad</h2>
                <div className="form-group form-checkbox">
                    <input type="checkbox" id="privacy" name="privacy" required />
                    <label htmlFor="privacy">
                    He leído y acepto el{' '}
                    <a href="#" className="link-privacy" target="_blank">aviso de privacidad</a>
                    {' '}de Mexicanos Primero Jalisco *
                    </label>
                </div>
                </div>

                <div className="form-submit">
                    <button type="submit" className="btn-send">
                        Enviar Aplicación
                    </button>
                </div>

            </form>
            </section>
        </main>
        
        <Footer />
        </>
    )
}

export default Form;