import { useState } from 'react';
import CharacterCard from '../components/CharacterCard';

function CharactersPage() {

  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

    const characters = [
  {
    id: 1,
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    species: "Human",
    status: "Alive",
  },
  {
    id: 2,
    name: "Morty Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    species: "Human",
    status: "Alive",
  },
];

if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Cargando personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button className="px-4 py-2 bg-black text-white rounded">
          Reintentar
        </button>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No hay personajes para mostrar</p>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Personajes</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  )
}

export default CharactersPage