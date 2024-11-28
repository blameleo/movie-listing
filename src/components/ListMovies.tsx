import { useState, useEffect } from "react";
import axios from "axios";
import { MOVIE_BASE_URL } from "../constants";
import { NavLink } from "react-router-dom";
import { Movie } from "../Types/global";

interface ListMoviesProps {
  searchTerm: string;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}
export default function ListMovies(props: ListMoviesProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const delaySearrch = setTimeout(() => {
      if (props.searchTerm.trim()) {
        getMovies();
      }
    }, 1000);

    return () => clearTimeout(delaySearrch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchTerm]);

  async function getMovies() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${MOVIE_BASE_URL}?apikey=${apiKey}&s=${props.searchTerm}&plot=short`
      );
      setIsLoading(false);
      props.setMovies(response.data.Search || []);
    } catch (err: unknown) {
      setIsLoading(false);
      console.error("Error fetching movies:", (err as Error).message);
      setError((err as Error).message);
    }
  }

  if (!props.searchTerm) {
    return <p className="text-gray-300 mt-10 ">No keyword to search a movie</p>;
  }
  if (isLoading) {
    return <p className="text-gray-300 mt-10 ">Loading....</p>;
  }

  return (
    <div className="text-white p-4">
      <h1 className="text-xl font-semibold my-4 capitalize text-gray-400">
        All Movies
      </h1>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : props.movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {props.movies.map((movie: Movie, index) => (
            <NavLink
              to={`/movie/${movie.imdbID}`}
              key={index}
              className="rounded-lg bg-zinc-900 p-4 cursor-pointer"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded-md w-full h-64 object-cover"
              />
              <div className="mt-2">
                <h2 className="text-lg font-medium">{movie.Title}</h2>
                <p className="text-sm text-gray-400">
                  <span className="text-red-400 font-medium">Year:</span>{" "}
                  {movie.Year}
                </p>
              </div>
            </NavLink>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Could not find movie</p>
      )}
    </div>
  );
}
