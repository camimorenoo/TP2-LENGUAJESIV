import ContactoF from '../components/ContactoF.jsx'

function Contacto() {
  return (
    <div className="page">
      <h1>Página de Contacto</h1>
      <p>Completá el formulario y te vamos a responder a la brevedad.</p>

      <div className="contacto-layout">
        <ContactoF />
        <iframe
          className="mapa"
          title="Ubicación"
          src="https://www.google.com/maps?q=Universidad+Cat%C3%B3lica+de+Salta&output=embed"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default Contacto