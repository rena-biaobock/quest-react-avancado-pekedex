import styled from "styled-components";
import LoadMoreButton from "../LoadMoreButton";
import { Link } from "react-router-dom";
import { getRamdomPokemonList } from "../../utils/getPokemon";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: rgba(255, 222, 0, 0.5);
  color: #000;

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
  const [pokedex, setPokedex] = useState([]);

  const { data, isFetching, isError, error, refetch, isSuccess } = useQuery({
    queryKey: ["random-pokemon-batch"],
    queryFn: () => getRamdomPokemonList(numberOfPokemons, pokemonIDs),
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPokedex((prev) => [...prev, ...data]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    refetch();
  }, []);

  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Section>
        <List>
          {pokedex.map((pokemon) => (
            <li key={pokemon.id}>
              <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
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
      <LoadMoreButton onClick={refetch} disabled={isFetching}>
        {isFetching ? "CARREGANDO..." : "CARREGAR MAIS"}
      </LoadMoreButton>
    </>
  );
};

export default Pokedex;
