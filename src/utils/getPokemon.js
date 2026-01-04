import axios from "axios";

export async function getPokemon(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
}

async function getRandomPokemon(pokemonIDs) {
  const randomIndex = Math.floor(Math.random() * pokemonIDs.length);
  const randomPokemonID = pokemonIDs.splice(randomIndex, 1)[0];
  const randomPokemon = await getPokemon(randomPokemonID);
  return randomPokemon;
}

export async function getRamdomPokemonList(numberOfPokemons, pokemonIDs) {
  let randomPokemonList = [];
  for (let i = 0; i < numberOfPokemons; i++) {
    const randomPokemon = await getRandomPokemon(pokemonIDs);
    randomPokemonList = [...randomPokemonList, randomPokemon];
  }
  return randomPokemonList;
}

export function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export async function getEnglishAbilityDescription(abilityURL) {
  const response = await axios.get(`${abilityURL}`);
  const abilityData = response.data;
  const englishDescription =
    abilityData.effect_entries.find((entry) => entry.language.name === "en")
      ?.effect ?? "No description available";
  return englishDescription;
}

export async function getAbilities(pokemon) {
  if (!pokemon) return {};

  const entries = await Promise.all(
    pokemon.abilities.map(async ({ ability }) => {
      const description = await getEnglishAbilityDescription(ability.url);
      return [ability.name, description];
    })
  );

  return Object.fromEntries(entries);
}
