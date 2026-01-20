const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}

export async function getCharacters(params: GetCharactersParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.append('page', String(params.page));
  if (params.name) query.append('name', params.name);
  if (params.status) query.append('status', params.status);
  if (params.species) query.append('species', params.species);

  const response = await fetch(`${BASE_URL}/character?${query.toString()}`);

  if (!response.ok) {
    throw new Error('Error al obtener personajes');
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
