import { useEffect, useRef, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { obtenerPersonajes } from "../services/rickAndMorty.api";

function CharactersPage() {

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [More, setMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    loadCharacters();
  }, [page]);

    const loadCharacters = async () => {
        if (!More) return;

    try {
      setIsLoading(true);
      const data = await obtenerPersonajes(page);
        
      setCharacters((prev) => [...prev, ...data.results]);
      setMore(Boolean(data.info.next));
    } catch (err) {
      setError("No se pudieron cargar los personajes");
    } finally {
      setIsLoading(false);
    }
  };

 useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && More && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [More, isLoading]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button  onClick={loadCharacters} className="px-4 py-2 bg-black text-white rounded">
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

      {isLoading && (
        <p className="text-center mt-6">Cargando más personajes...</p>
      )}

      <div ref={observerRef} className="h-1" />
    </div>
  )
}

export default CharactersPage