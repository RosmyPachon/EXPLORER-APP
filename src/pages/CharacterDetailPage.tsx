import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detallePersonaje } from "../services/rickAndMorty.api";

function CharacterDetailPage() {
  const { id } = useParams();

  const [personaje, setPersonaje] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarPersonaje = async () => {
      try {
        setCargando(true);
        const data = await detallePersonaje(id!);
        setPersonaje(data);
      } catch {
        setError("No se pudo cargar el personaje");
      } finally {
        setCargando(false);
      }
    };

    cargarPersonaje();
  }, [id]);

  if (cargando) return <p className="p-6">Cargando...</p>;

  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
    
    <div className="max-w-5xl w-full mx-auto">
        
        <Link 
            to="/characters" 
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-6 font-bold"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al listado
        </Link>

        <div className="bg-[#3cbe54] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#adff2f] flex flex-col md:flex-row">
            
            <div className="w-full md:w-2/5 h-96 md:h-auto relative">
                <img
                    src={personaje.image}
                    alt={personaje.name}
                    className="w-full h-full object-cover"
                />
                {/* Badge de Estado sobre la imagen */}
                <div className="absolute top-4 left-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg
                        ${personaje.status === 'Alive' ? 'bg-green-400 text-green-900' : 
                          personaje.status === 'Dead' ? 'bg-red-500 text-white' : 
                          'bg-gray-300 text-gray-700'}`}>
                        {personaje.status}
                    </span>
                </div>
            </div>
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                
                <h1 className="text-4xl md:text-5xl font-black text-[#03440E] mb-2 leading-tight">
                    {personaje.name}
                </h1>
                
                <p className="text-lg font-medium text-[#0a2f01]/80 mb-8 italic">
                    Expediente #{personaje.id}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="bg-[#0a2f01]/10 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-xs font-bold text-[#03440E] uppercase opacity-70 mb-1">Especie</p>
                        <p className="text-xl font-bold text-[#0a2f01]">{personaje.species}</p>
                    </div>

                    <div className="bg-[#0a2f01]/10 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-xs font-bold text-[#03440E] uppercase opacity-70 mb-1">Género</p>
                        <p className="text-xl font-bold text-[#0a2f01]">{personaje.gender}</p>
                    </div>

                    <div className="bg-[#0a2f01]/10 p-4 rounded-xl backdrop-blur-sm sm:col-span-2 hover:bg-[#0a2f01]/20 transition-colors cursor-help">
                        <p className="text-xs font-bold text-[#03440E] uppercase opacity-70 mb-1">Origen</p>
                        <p className="text-lg font-bold text-[#0a2f01] flex items-center gap-2">
                            🪐 {personaje.origin.name}
                        </p>
                    </div>

                    <div className="bg-[#0a2f01]/10 p-4 rounded-xl backdrop-blur-sm sm:col-span-2 hover:bg-[#0a2f01]/20 transition-colors cursor-help">
                        <p className="text-xs font-bold text-[#03440E] uppercase opacity-70 mb-1">Última ubicación conocida</p>
                        <p className="text-lg font-bold text-[#0a2f01] flex items-center gap-2">
                            📍 {personaje.location.name}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default CharacterDetailPage;
