const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}

export async function obtenerPersonajes(page : number) {
  const response = await fetch(`${BASE_URL}/character?page=${page}`);

  if (!response.ok) {
    throw new Error("Error al obtener personajes");
  }

  return response.json();
}

export async function getCharacterById(id: number) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('Error al obtener el personaje');
  }

  return response.json();
}

export async function getEpisodesByIds(ids: number[]) {
  const response = await fetch(`${BASE_URL}/episode/${ids.join(',')}`);

  if (!response.ok) {
    throw new Error('Error al obtener episodios');
  }

  return response.json();
}
