import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListMovies from "./components/ListMovies";
import Navbar from "./components/Navbar";
import ListMovie from "./components/ListMovie";
import { useState } from "react";
import { Movie } from "./Types/global";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("love");

  return (
    <BrowserRouter>
      <main className="px-4 sm:px-10">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={<ListMovies movies={movies} setMovies={setMovies} searchTerm={searchTerm}/>}
          />
          <Route path="/movie/:id" element={<ListMovie />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
