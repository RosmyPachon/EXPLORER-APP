import { Link } from "react-router-dom";

type Character = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  location: {
    name: string;
  };
};

interface Props {
  character: Character;
}

function CharacterCard({ character }: Props) {
  return (
    <Link to={`/characters/${character.id}`}>
        <div className="bg-[#3cbe54] rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-transparent hover:border-[#adff2f]">

    <div className="relative overflow-hidden h-52">
        <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute top-2 right-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm 
                ${character.status === 'Alive' ? 'bg-green-400 text-green-900' : 
                  character.status === 'Dead' ? 'bg-red-500 text-white' : 
                  'bg-gray-300 text-gray-700'}`}>
                {character.status}
            </span>
        </div>
    </div>

    <div className="p-4 flex flex-col gap-2">
        <h2 className="text-xl font-black text-[#03440E] leading-tight group-hover:text-white transition-colors">
            {character.name}
        </h2>

        <div className="bg-[#0a2f01]/10 p-2 rounded-lg mt-1 backdrop-blur-sm">
         
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-[#03440E] uppercase opacity-70">Especie</span>
                <span className="text-sm font-semibold text-[#0a2f01]">{character.species}</span>
            </div>

            <div className="flex flex-col">
                <span className="text-xs font-bold text-[#03440E] uppercase opacity-70">Ubicación</span>
                <p className="text-sm text-[#0a2f01] truncate flex items-center gap-1">
                    📍 {character.location.name}
                </p>
            </div>
        </div>
    </div>
</div>
    </Link>
  );
}

export default CharacterCard;
