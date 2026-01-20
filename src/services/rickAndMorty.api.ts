const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}

export async function obtenerPersonajes(pagina : number , nombre?: string) {
  const url = nombre ? `${BASE_URL}/character?page=${pagina}&name=${nombre}` 
  : `${BASE_URL}/character?page=${pagina}`;

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Error al obtener personajes");
  }

  return res.json();
}

export async function detallePersonaje(id: string) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el personaje');
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
