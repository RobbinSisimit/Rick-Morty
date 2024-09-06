import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [characters, setCharacters] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const speciesOptions = [
        "Human",
        "Alien",
        "Humanoid",
        "Poopybutthole",
        "Mythological",
        "Animal",
        "Robot",
        "Cronenberg"
    ];

    const fetchCharacters = () => {
        const url = ('https://rickandmortyapi.com/api/character/');
        const params = new URLSearchParams({
            name: name,
            page: page,
            species: species
        });
        url.search = params.toString();

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data.results || []);
                setError(null);
            })
            .catch((error) => {
                console.error('Error al obtener datos', error);
                setError('Error al obtener datos');
            });
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1) return;
        setPage(newPage);
        fetchCharacters();
    };

    return (
        <div className="container mt-4">
            <h1>Búsqueda de Personajes</h1>
            <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Buscar por nombre"
                />
            </div>
            <div className="form-group">
                <select
                    className="form-control"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                >
                    <option value="">Todas las especies</option>
                    {speciesOptions.map((specie, index) => (
                        <option key={index} value={specie}>
                            {specie}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary" onClick={fetchCharacters}>Buscar</button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {characters.length > 0 ? (
                <>
                    <div className="row mt-4">
                        {characters.map((character) => (
                            <div key={character.id} className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={character.image} alt={character.name} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{character.name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page <= 1}
                        >
                            Anterior
                        </button>
                        <span>Página {page}</span>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handlePageChange(page + 1)}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            ) : (
                <p className="mt-3">No se encontraron personajes</p>
            )}
        </div>
    );
};

