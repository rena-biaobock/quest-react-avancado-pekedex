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

const pokedex = [];
const newPokemon = await getRandomPokemon();
console.log(newPokemon);

const HomePage = () => {
  return (
    <>
      <div>
        <h2>Pokedex:</h2>
        <section>
          <ul></ul>
        </section>
      </div>
    </>
  );
};

export default HomePage;
