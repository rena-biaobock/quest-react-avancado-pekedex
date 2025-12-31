import { useEffect, useState } from "react";
import styled from "styled-components";
import LoadMoreButton from "../LoadMoreButton";

const Section = styled.section`
  border: 1px solid black;
  padding: 10px;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 10px;
`;

const Card = styled.a`
  width: 100px;
  height: 160px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  &:hover {
    cursor: pointer;
    background: #ffff00;
    border: 2px solid black;
  }
`;

const Img = styled.img`
  height: 100px;
  max-width: 100%;
`;

const Name = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;

const pokemonIDs = Array.from({ length: 1025 }, (_, i) => i + 1);

const Pokedex = () => {
  const [pokedex, setPokedex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    let randomPokemonList = [];
    for (let i = 0; i < numberOfPokemons; i++) {
      const randomPokemon = await getRandomPokemon();
      randomPokemonList = [...randomPokemonList, randomPokemon];
    }
    return randomPokemonList;
  }

  async function updatePokedex(numberOfPokemons) {
    try {
      const randomPokemonList = await getRamdomPokemonList(numberOfPokemons);
      setPokedex((prevPokedex) => [...prevPokedex, ...randomPokemonList]);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updatePokedex(5);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Section>
        <List>
          {pokedex.map((pokemon) => (
            <li key={pokemon.id}>
              <Card>
                <Img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={pokemon.forms[0].name}
                />
                <Name>{pokemon.forms[0].name.toUpperCase()}</Name>
              </Card>
            </li>
          ))}
        </List>
      </Section>
      <LoadMoreButton onClick={() => updatePokedex(10)}>
        CARREGAR MAIS
      </LoadMoreButton>
    </>
  );
};

export default Pokedex;
