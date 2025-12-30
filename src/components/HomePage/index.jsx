import styled from "styled-components";
import Pokedex from "../Pokedex";

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const PokedexSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tittle = styled.h1`
  text-decoration: bold;
`;

const HomePage = () => {
  return (
    <>
      <Main>
        <PokedexSection>
          <Tittle>Pokedex:</Tittle>
          <Pokedex />
        </PokedexSection>
      </Main>
    </>
  );
};

export default HomePage;
