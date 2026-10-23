import { useEffect, useState } from 'react'

const API_URL = 'https://dev.to/api/articles?tag=webdev&per_page=20'

function Inicio() {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la respuesta de la API')
        return res.json()
      })
      .then((data) => {
        if (!activo) return
        // Nos quedamos solo con los que tienen imagen de portada
        const conImagen = data.filter((art) => art.cover_image).slice(0, 6)
        setArticulos(conImagen)
      })
      .catch(() => {
        if (activo) setError('No se pudieron cargar los artículos.')
      })
      .finally(() => {
        if (activo) setCargando(false)
      })

    return () => {
      activo = false
    }
  }, [])

  function obtenerTags(art) {
    if (Array.isArray(art.tag_list)) return art.tag_list
    return String(art.tag_list || art.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }

  return (
    <div className="page">
      <h1>Página de Inicio</h1>
      <p>Últimos artículos de desarrollo web de la comunidad DEV.</p>

      {cargando && <p>Cargando artículos...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="cards">
        {articulos.map((art) => (
          <div className="card card-articulo" key={art.id}>
            <img src={art.cover_image} alt={art.title} />
            <h3>{art.title}</h3>
            <p>{art.description}</p>
            <p className="detalle">Autor: {art.user.name}</p>
            <p className="detalle">
              {art.positive_reactions_count} reacciones · {art.reading_time_minutes} min de lectura
            </p>
            <div className="tags">
              {obtenerTags(art).map((tag) => (
                <span className="badge" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={art.url} target="_blank" rel="noreferrer">
              Leer artículo
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inicio