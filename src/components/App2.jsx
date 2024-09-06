import React, { useState } from "react";

export const App = () => {
    const [name, setName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);

    const fetchCharacters = () => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results || []); // `results` contains the array of characters
                setError(null); // Clear any previous errors
            })
            .catch((error) => {
                console.error('Error fetching data', error);
                setError('Error fetching data');
            });
    };

    return (
        <>
            <h1>Character Search</h1>
            <input
                className="form-control me-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={fetchCharacters}>Search</button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

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
                <p>No characters found</p>
            )}
        </>
    );
};