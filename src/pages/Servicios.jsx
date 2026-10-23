import { servicios } from '../data/servicios.js'

function Servicios() {
  return (
    <div className="page">
      <h1>Página de Servicios</h1>
      <p>Estas son las tecnologías y habilidades en las que trabajamos.</p>

      <div className="cards">
        {servicios.map((servicio) => (
          <div className="card card-servicio" key={servicio.id}>
            <img src={servicio.imagen} alt={servicio.nombre} />
            <h3>{servicio.nombre}</h3>
            <span className="badge">{servicio.categoria}</span>
            <p>{servicio.descripcion}</p>
            <p className="detalle">Nivel: {servicio.nivel}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Servicios