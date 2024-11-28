import axios from "axios";
import { MOVIE_BASE_URL } from "../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../Types/global";

const apiKey = import.meta.env.VITE_OMDB_API_KEY;

export default function ListMovie() {
  const [movie, setMovie] = useState<Movie>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  async function getMovie() {
    try {
      const response = await axios.get(
        `${MOVIE_BASE_URL}?apikey=${apiKey}&i=${id}&plot=full`
      );
      setMovie(response.data);
      setError(null);
    } catch (err: unknown) {
      console.error("Error fetching movie:", (err as Error).message);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading movie details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="text-gray-400">Movie not found.</div>;
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-400 ">Overview</h2>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500 text-center">
          {movie.Title}
        </h1>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full max-w-xs rounded-md mx-auto mb-4"
        />

        <div className="flex flex-col gap-y-2 sm:flex-row mb-5 justify-between p-4 rounded-lg bg-slate-900">
          <p>
            <span className="font-semibold text-red-400">Year:</span> {movie.Year}
          </p>
          <p>
            <span className="font-semibold text-red-400">Genre:</span> {movie.Genre}
          </p>
          <p>
            <span className="font-semibold text-red-400">Director:</span> {movie.Director}
          </p>

          <p>
            <span className="font-semibold text-red-400">Rating:</span> {movie.imdbRating} /
            10
          </p>
        </div>
        <p className="bg-slate-900 p-4 rounded-lg">
          <span className="font-semibold text-red-400">Plot:</span> {movie.Plot}
        </p>
      </div>
    </div>
  );
}
