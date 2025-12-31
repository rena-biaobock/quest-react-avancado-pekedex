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
