import { useEffect, useRef, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { obtenerPersonajes } from "../services/rickAndMorty.api";

function CharactersPage() {

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [busqueda, setBusqueda] = useState("");


  const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    cargarPersonajes();
  }, [page]);

    const cargarPersonajes = async () => {
        if (!more) return;

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

  const reiniciarBusqueda = async () => {
  try {
    setIsLoading(true);
    setError(null);
    setBusqueda("");
    setPage(1);

    const data = await obtenerPersonajes(1, "");
    setCharacters(data.results);
    setMore(Boolean(data.info.next));
  } catch {
    setError("Error al cargar personajes");
  } finally {
    setIsLoading(false);
  }
};


 useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && more && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [more, isLoading]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button  onClick={reiniciarBusqueda} className="px-4 py-2 bg-black text-white rounded">
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

const buscarPersonajes = async () => {
  try {
    setIsLoading(true);
    setError(null);
    setPage(1);

    const data = await obtenerPersonajes(1, busqueda);

    setCharacters(data.results);
    setMore(Boolean(data.info.next));

  } catch {
        setError("No se encontraron personajes");
        setCharacters([]);
  } finally {
        setIsLoading(false);
  }
};


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Personajes</h1>

    <div className="mb-6 flex gap-2">
        <input
            type="text"
            placeholder="Buscar personaje..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 p-2 border rounded"
        />

        <button
            onClick={buscarPersonajes}
            className="px-4 bg-black text-white rounded"
        >
            Buscar
        </button>
    </div>


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