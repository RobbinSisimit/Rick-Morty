import React, { useState } from "react";
export const App = () =>{
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [speciesList, setSpeciesList] = useState([]);
    const fetch2 = () => {
        let url = `https://rickandmortyapi.com/api/character/?name=${name}`;
        if (speciesFilter) {
            url += `&species=${speciesFilter}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results || []);
                // Extraer especies únicas
                const uniqueSpecies = [...new Set(data.results.map(character => character.species))];
                setSpeciesList(uniqueSpecies);
            })
            .catch(() => setError('Error al obtener datos'));
    }

    const handleSearch = () => {
        fetchCharacters();
    };

    return(
        <>
            <h1>buscar</h1>
            <input
                className="form-control me-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetch2}>:D</button>

            <div>
                <label htmlFor="speciesFilter">Filtrar por especie:</label>
                <select
                    id="speciesFilter"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                >
                    <option value="">Todas</option>
                    {speciesList.map((species, index) => (
                        <option key={index} value={species}>{species}</option>
                    ))}
                </select>
            </div>
            

            {characters.length > 0 ? (
                <ul>
                    {characters.map((character) => (
                        <li key={character.id}>
                            <h2>{character.name}</h2>
                            <img src={character.image} alt={character.name} style={{ width: '100px' }} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p></p>
            )}
        </>
    )
}
