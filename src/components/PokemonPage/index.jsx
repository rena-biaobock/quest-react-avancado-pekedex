import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPokemon } from "../../utils/getPokemon";

const PokemonPage = () => {
  const { pokemonID } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await getPokemon(pokemonID);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [pokemonID]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokemon not found</p>;

  return (
    <>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />

      <h1>{pokemon.name}</h1>

      <h2>Movements:</h2>
      <ul>
        {pokemon.moves.map(({ move }) => (
          <li key={move.name}>{move.name}</li>
        ))}
      </ul>

      <h2>Skills:</h2>
      <ul>
        {pokemon.abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>

      <h2>Type:</h2>
      <ul>
        {pokemon.types.map(({ type }) => (
          <li key={type.name}>{type.name}</li>
        ))}
      </ul>
    </>
  );
};

export default PokemonPage;
