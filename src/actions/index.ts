import axios from "axios";
import { MOVIE_BASE_URL } from "../constants";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;
const randomImdbId = `love`;

export async function getMovies() {
  try {
    const response = await axios.get(
      `${MOVIE_BASE_URL}?apikey=${apiKey}&s=${randomImdbId}`
    );
    console.log(response);

    return response.data.Search || [];
  } catch (err: unknown) {
    console.error("Error fetching movies:", err.message);
    return err.message;
  }
}
