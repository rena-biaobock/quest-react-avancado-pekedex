import { useParams } from "react-router-dom";

const PokemonPage = () => {
  const { pokemonName } = useParams();
  return <h1>Pokemon: {pokemonName}</h1>;
};

export default PokemonPage;
