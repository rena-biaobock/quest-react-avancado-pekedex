export async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
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
  const response = await fetch(`${abilityURL}`);
  const abilityData = await response.json();
  const englishDescription =
    abilityData.effect_entries.find((entry) => entry.language.name === "en")
      ?.effect ?? "No description available";
  return englishDescription;
}
