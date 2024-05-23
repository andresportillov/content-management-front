import React, { useState } from 'react';

function TematicaSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar por temática"
      value={query}
      onChange={handleChange}
    />
  );
}

export default TematicaSearch;
