import { useEffect, useState } from "react";

const Pokedex = () => {
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pokemonIDs = Array.from({ length: 1025 }, (_, i) => i + 1);

  async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.json();
  }

  async function getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * pokemonIDs.length);
    const randomPokemonID = pokemonIDs.splice(randomIndex, 1)[0];
    const randomPokemon = await getPokemon(randomPokemonID);
    return randomPokemon;
  }

  async function getRamdomPokemonList(numberOfPokemons) {
    let pokemonList = [];
    for (let i = 0; i < numberOfPokemons; i++) {
      const randomPokemon = await getRandomPokemon();
      pokemonList = [...pokemonList, randomPokemon];
    }
    return pokemonList;
  }

  useEffect(() => {
    const updatePokedex = async (numberOfPokemons) => {
      try {
        const randomPokemonList = await getRamdomPokemonList(numberOfPokemons);
        setPokedex([...pokedex, ...randomPokemonList]);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    updatePokedex(10);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section>
        <ul>
          {pokedex.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.forms[0].name}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Pokedex;
