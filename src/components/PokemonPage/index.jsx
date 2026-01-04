import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPokemon,
  capitalizeFirstLetter,
  getAbilities,
} from "../../utils/getPokemon";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Main = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 700px;
  border: 2px solid #ff0000;
  border-radius: 10px;
`;

const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: black;
  padding; 20px;
`;

const Img = styled.img`
  max-width: 300px;
`;

const TittleH1 = styled.h1`
  font-size: 2rem;
`;

const TittleH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5px;
  border-bottom: 1px solid black;
`;

const TittleH2NoBorder = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5px;
  margin-right: 10px;
`;

const TypeSection = styled.section`
  display: flex;
  align-items: center;
`;

const TypeList = styled.ul`
  display: flex;
  gap: 5px;
`;

const TypeItem = styled.li`
  padding: 2px;
  background: #3b4cca;
  color: #fff;
  border-radius: 10px;
`;

const AbilityList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: justify;
`;

const SkillTittle = styled.h3`
  font-size: 1rem;
  margin-bottom: 2px;
`;

const MovesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
`;

const Move = styled.li`
  margin: 2px;
  padding: 1px;
  background: #3b4cca;
  color: #fff;
  border-radius: 10px;
`;

const PokemonPage = () => {
  const { pokemonID } = useParams();

  const pokemonQuery = useQuery({
    queryKey: ["pokemon", pokemonID],
    queryFn: () => getPokemon(pokemonID),
    enabled: !!pokemonID,
    staleTime: 1000 * 60 * 5,
  });

  const pokemon = pokemonQuery.data;

  const abilityQuery = useQuery({
    queryKey: ["ability", pokemon?.id],
    queryFn: () => getAbilities(pokemon),
    enabled: !!pokemon,
    staleTime: 1000 * 60 * 5,
  });

  const abilityDescriptions = abilityQuery.data ?? {};

  if (pokemonQuery.isLoading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokemon not found</p>;

  return (
    <>
      <Main>
        <DivContainer>
          <Img
            src={
              pokemon.sprites.other.dream_world.front_default ??
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />

          <TittleH1>{pokemon.name.toUpperCase()}</TittleH1>

          <DivInfo>
            <TypeSection>
              <TittleH2NoBorder>Type:</TittleH2NoBorder>
              <TypeList>
                {pokemon.types.map(({ type }) => (
                  <TypeItem key={type.name}>{type.name}</TypeItem>
                ))}
              </TypeList>
            </TypeSection>

            <section>
              <TittleH2>Skills</TittleH2>
              <AbilityList>
                {pokemon.abilities.map(({ ability }) => (
                  <li key={ability.name}>
                    <SkillTittle>
                      {capitalizeFirstLetter(ability.name)}
                    </SkillTittle>
                    <p>
                      {abilityQuery.isLoading ? (
                        <p>Loading ability description...</p>
                      ) : (
                        abilityDescriptions[ability.name]
                      )}
                    </p>
                  </li>
                ))}
              </AbilityList>
            </section>

            <section>
              <TittleH2>Moves</TittleH2>
              <MovesList>
                {pokemon.moves.map(({ move }) => (
                  <Move key={move.name}>
                    {capitalizeFirstLetter(move.name)}
                  </Move>
                ))}
              </MovesList>
            </section>
          </DivInfo>
        </DivContainer>
      </Main>
    </>
  );
};

export default PokemonPage;
