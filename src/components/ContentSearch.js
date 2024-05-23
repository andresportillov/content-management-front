import React, { useState } from 'react';

function NombreContenidoSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por nombre de contenido"
      value={query}
      onChange={handleChange}
    />
  );
}

export default NombreContenidoSearch;
