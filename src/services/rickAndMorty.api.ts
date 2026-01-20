const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}

export const obtenerPersonajes = async (
  page = 1,
  name?: string,
  status?: string
) => {
    const params = new URLSearchParams();
    params.append("page", String(page));

    if (name) params.append("name", name);
    if (status) params.append("status", status);

    const response = await fetch(
      `https://rickandmortyapi.com/api/character?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Error al cargar personajes");
    }

    return response.json();
};



export async function detallePersonaje(id: string) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error('No se pudo cargar el personaje');
  }

  return response.json();
}