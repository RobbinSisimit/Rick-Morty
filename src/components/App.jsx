import './App.css';
import { useCharacters } from "../hooks/useCharacters"

export const App = () => {

    const { characters, speciesList, setName, setSpeciesFilter, fetchCharacters } = useCharacters()

    return (
        <>
            <h1>Buscar Personajes</h1>

            <input type="text" placeholder="Nombre del personaje" onChange={(e) => setName(e.target.value)} />
            <button onClick={fetchCharacters}>Buscar</button>
            <div>
                <label>Filtrar por especie:</label>
                <select onChange={(e) => setSpeciesFilter(e.target.value)} >
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


