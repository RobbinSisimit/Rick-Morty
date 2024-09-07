import { useState } from "react";
import './App.css'; 

export const App = () => {
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [speciesList, setSpeciesList] = useState([]);

    const fetch2 = () => {
        let url = `https://rickandmortyapi.com/api/character/?name=${name}`
        if (speciesFilter) {
            url += `&species=${speciesFilter}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results || [])
                const uniqueSpecies = [...new Set(data.results.map(character => character.species))]
                setSpeciesList(uniqueSpecies);
            })
            .catch(() => alert('Error al obtener datos'))
    }

    return (
        <>
            <h1>Buscar Personajes</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetch2}>Buscar</button>

            <div>
                <label>Filtrar por especie:</label>
                <select
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
                <div className="character-grid"> 
                    {characters.map((character) => (
                        <div key={character.id} className="character-card">
                            <h2>{character.name}</h2>
                            <img src={character.image} alt={character.name} style={{ width: '100px' }} />
                        </div>
                    ))}
                </div>
            ) : (
                <p></p>
            )}
        </>
    )
}

