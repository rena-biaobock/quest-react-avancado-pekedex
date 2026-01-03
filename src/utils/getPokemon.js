import axios from "axios";

export async function getPokemon(id) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
}

function pickRandomIDs(allIDs, count) {
  const shuffled = [...allIDs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function getRamdomPokemonList(numberOfPokemons, pokemonIDs) {
  const randomIDs = pickRandomIDs(pokemonIDs, numberOfPokemons);
  const promises = randomIDs.map((id) => getPokemon(id));
  return Promise.all(promises);
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
