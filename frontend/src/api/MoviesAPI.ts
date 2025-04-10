import axios from "axios";
import { Movie } from "../types/Movie";

const BASE_URL =
  "https://cineniche4-6-apa5hjhbcbe8axg8.westcentralus-01.azurewebsites.net/Movies"; // Adjust your base URL if needed

export const fetchMovies = async (pageNum: number, pageSize: number) => {
  const response = await axios.get(`${BASE_URL}/withGenres`, {
    params: { pageNum, pageSize },
  });
  return response.data;
};

export const addMovie = async (movie: Movie) => {
  const response = await axios.post(`${BASE_URL}`, movie);
  return response.data;
};

export const updateMovie = async (movie: Movie) => {
  const response = await axios.put(`${BASE_URL}/${movie.showId}`, movie);
  return response.data;
};

export const deleteMovie = async (showId: string) => {
  const response = await axios.delete(`${BASE_URL}/${showId}`);
  return response.data;
};
