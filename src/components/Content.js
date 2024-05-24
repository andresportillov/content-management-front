import React from 'react';
import '../styles/Content.css';

function Content({ content, error }) {
  return (
    <div>
      <h2>Contenidos Disponibles</h2>
      {error && <p>{error}</p>}
      <div className="contenidos-lista">
        {content && content.length > 0 ? (
          content.map(contenido => (
            <div key={contenido._id} className="contenido-item">
              <h3>{contenido.title}</h3>
              <p><strong>Autor:</strong> {contenido.createdBy}</p>
              <p><strong>Fecha:</strong> {new Date(contenido.createdAt).toLocaleDateString()}</p>
              <p><strong>Categoría:</strong> {contenido.category}</p>
              <p><strong>Tema:</strong> {contenido.topic}</p>

              {contenido.type === 'image' && <img src={contenido.url} alt={contenido.title} />}
              {contenido.type === 'video' && (
                <video controls>
                  <source src={contenido.url} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </video>
              )}
              {contenido.type === 'text' && (
                <pre>{contenido.text}</pre>
              )}
            </div>
          ))
        ) : (
          <p>No hay contenidos disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default Content;
