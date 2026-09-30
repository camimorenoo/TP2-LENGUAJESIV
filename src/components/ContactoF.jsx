import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './ContactoF.css'

// Reemplazar por los datos de tu cuenta de EmailJS
const SERVICE_ID = 'service_l1pdhgb'
const TEMPLATE_ID = 'template_qyk372j'
const PUBLIC_KEY = 'SRy4h71YQeDDaKY6P'

const MAX_MENSAJE = 300

const valoresIniciales = {
  nombre: '',
  email: '',
  mensaje: '',
}

function validarCampo(nombreCampo, valor) {
  switch (nombreCampo) {
    case 'nombre': {
      if (!valor.trim()) return 'El nombre y apellido es obligatorio.'
      if (valor.trim().length < 3) return 'Debe tener al menos 3 caracteres.'
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(valor)) {
        return 'Solo se permiten letras y espacios.'
      }
      return ''
    }
    case 'email': {
      if (!valor.trim()) return 'El correo electrónico es obligatorio.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return 'Ingresá un correo electrónico válido.'
      }
      return ''
    }
    case 'mensaje': {
      if (!valor.trim()) return 'El mensaje es obligatorio.'
      if (valor.length > MAX_MENSAJE) {
        return `El mensaje no puede superar los ${MAX_MENSAJE} caracteres.`
      }
      return ''
    }
    default:
      return ''
  }
}

function ContactForm() {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [estadoEnvio, setEstadoEnvio] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'mensaje' && value.length > MAX_MENSAJE) return
    setValores((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }))
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }))
  }

  function formularioValido() {
    const nuevosErrores = {
      nombre: validarCampo('nombre', valores.nombre),
      email: validarCampo('email', valores.email),
      mensaje: validarCampo('mensaje', valores.mensaje),
    }
    setErrores(nuevosErrores)
    return Object.values(nuevosErrores).every((error) => error === '')
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEstadoEnvio(null)
    if (!formularioValido()) return

    setEnviando(true)
    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        { nombre: valores.nombre, email: valores.email, mensaje: valores.mensaje },
        { publicKey: PUBLIC_KEY },
      )
      .then(() => {
        setEstadoEnvio('ok')
        setValores(valoresIniciales)
        setErrores({})
      })
      .catch(() => setEstadoEnvio('error'))
      .finally(() => setEnviando(false))
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={valores.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej: Juana Pérez"
        />
        {errores.nombre && <span className="error-message">{errores.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={valores.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="ejemplo@correo.com"
        />
        {errores.email && <span className="error-message">{errores.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={valores.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Escribí tu mensaje..."
        />
        <div className="contador">{valores.mensaje.length}/{MAX_MENSAJE} caracteres</div>
        {errores.mensaje && <span className="error-message">{errores.mensaje}</span>}
      </div>

      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {estadoEnvio === 'ok' && <p className="estado-envio estado-ok">¡Mensaje enviado correctamente!</p>}
      {estadoEnvio === 'error' && (
        <p className="estado-envio estado-error">Ocurrió un error al enviar el mensaje. Intentá de nuevo.</p>
      )}
    </form>
  )
}

export default ContactForm