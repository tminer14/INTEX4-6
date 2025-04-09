import { Movie } from "../types/Movie";

export async function fetchMovies(
  pageNum: number,
  pageSize: number
): Promise<fetchMoviesResponse> {
  const response = await fetch(
    `${API_URL}/Movies/withGenres?pageNum=${pageNum}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  };

  const data: fetchMoviesResponse = await response.json();
  return data;
}
