import { Movie } from "../types/Movie";

const API_URL = "https://localhost:5130";

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(`${API_URL}/Movies/withGenres`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data: Movie[] = await response.json();
  return data;
}
