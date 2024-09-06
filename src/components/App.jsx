import React, { useState } from "react";
export const App = () =>{
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const fetch2 = () => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results || []); // `results` contiene el array de personajes
                
            })
            .catch((error) => {
                console.error('Error al obtener datos', error);
                setError('Error al obtener datos');
            })
    }
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



