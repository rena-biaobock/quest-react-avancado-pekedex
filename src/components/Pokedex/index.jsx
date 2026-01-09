import styled from "styled-components";
import LoadMoreButton from "../LoadMoreButton";
import { Link } from "react-router-dom";
import { getRamdomPokemonList } from "../../utils/getPokemon";
import { useInfiniteQuery } from "@tanstack/react-query";

const Section = styled.section`
  display: flex;
  border-radius: 10px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Card = styled.div`
  width: 100px;
  height: 160px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(255, 222, 0, 0.5);
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 2px 8px 2px ${({ theme }) => theme.colors.boxshadow};
    background: rgba(255, 222, 0, 1);
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
const numberOfPokemons = 10;

const Pokedex = () => {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    error,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["random-pokemon"],
    queryFn: ({ pageParam = [] }) =>
      getRamdomPokemonList(numberOfPokemons, pokemonIDs, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return allPages.flat().map((pokemon) => pokemon.id);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isError) return <p>{error.message}</p>;

  const pokedex = data?.pages.flat() ?? [];

  return (
    <>
      <Section>
        <List>
          {pokedex.map((pokemon) => (
            <li key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>
                <Card>
                  <Img
                    src={
                      pokemon.sprites.other.dream_world.front_default ??
                      pokemon.sprites.front_default
                    }
                    alt={pokemon.forms[0].name}
                  />
                  <Name>{pokemon.forms[0].name.toUpperCase()}</Name>
                </Card>
              </Link>
            </li>
          ))}
        </List>
      </Section>

      <LoadMoreButton onClick={fetchNextPage} disabled={isFetching}>
        {isFetching ? "CARREGANDO..." : "CARREGAR MAIS"}
      </LoadMoreButton>
    </>
  );
};

export default Pokedex;
