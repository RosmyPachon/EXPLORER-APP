import { useEffect, useRef, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { obtenerPersonajes } from "../services/rickAndMorty.api";
import titulo from "../assets/titulo.gif";

function CharactersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  
    const [fetchTrigger, setFetchTrigger] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        setError(null); 

        const data = await obtenerPersonajes(page, busqueda, estado);

        if (!data.results) {
            setCharacters([]);
            setMore(false);
            if (page === 1) setError("No se encontraron personajes con ese nombre.");
            return;
        }

        setCharacters((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );

        setMore(Boolean(data.info.next));
      } catch (err) {
        if (page === 1) {
            setError("¡Maldición! Falló el portal interdimensional");
            setCharacters([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page, fetchTrigger]); 

  const handleBuscar = () => {
    setPage(1);
    setMore(true);
    setCharacters([]);
    setFetchTrigger(prev => prev + 1); 
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(e.target.value);
    setPage(1);
    setMore(true);
    setCharacters([]);
    setTimeout(() => setFetchTrigger(prev => prev + 1), 0); 
  };

  // INFINITE SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && more && !isLoading && !error) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [more, isLoading, error]); 

  return (
    <div className="min-h-screen bg-black p-6">
  
      <div className="flex justify-center mb-10">
        <img 
          src={titulo} 
          alt="Rick and Morty" 
          className="h-20 md:h-32 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mb-10 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        
        <input
          type="text"
          placeholder="Buscar personaje"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          className="flex-1 p-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#adff2f] focus:shadow-[0_0_10px_#adff2f] transition-all"
        />

        <select
          value={estado}
          onChange={handleEstadoChange}
          className="p-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#adff2f] focus:shadow-[0_0_10px_#adff2f] cursor-pointer transition-all"
        >
          <option value="">Todos los estados</option>
          <option value="alive">Alive 🧬</option>
          <option value="dead">Dead 💀</option>
          <option value="unknown">Unknown ❓</option>
        </select>

        <button
          onClick={handleBuscar}
          className="px-8 py-3 bg-[#3cbe54] hover:bg-[#adff2f] text-[#03440E] font-extrabold rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95 uppercase tracking-wide"
        >
          Buscar
        </button>
      </div>
      
      {error && (
        <div className="text-center py-10 animate-fade-in">
             <p className="text-xl text-red-500 font-bold mb-2">¡Oh no, Morty!</p>
             <p className="text-gray-400 mb-4">{error}</p>
             <button
                onClick={() => { setBusqueda(''); setEstado(''); handleBuscar(); }}
                className="text-[#adff2f] underline hover:text-white"
             >
               Intenta nuevamente.
             </button>
        </div>
      )}

      {!isLoading && !error && characters.length === 0 && (
         <div className="text-center py-10">
             <p className="text-gray-400">No hay resultados para esta búsqueda.</p>
         </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      {isLoading && (
        <div className="text-center mt-12 mb-12">
           <p className="text-[#adff2f] text-xl font-bold animate-pulse">
             🛸 Viajando entre dimensiones...
           </p>
        </div>
      )}

      <div ref={observerRef} className="h-4" />
    </div>
  );
}

export default CharactersPage;