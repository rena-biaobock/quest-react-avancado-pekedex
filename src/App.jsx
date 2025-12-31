import { Routes, Route } from "react-router-dom";
import PokemonPage from "./components/PokemonPage";
import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;
