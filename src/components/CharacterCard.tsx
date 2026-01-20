type Character = {
  name: string;
  image: string;
  species: string;
  status: string;
};

interface Props {
  character: Character;
}

function CharacterCard({ character }: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">{character.name}</h2>
        <p className="text-sm text-gray-600">{character.species}</p>
        <span className="text-sm font-medium">
          Estado: {character.status}
        </span>
      </div>
    </div>
  );
}

export default CharacterCard;
