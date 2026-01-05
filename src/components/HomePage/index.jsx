import styled from "styled-components";
import Pokedex from "../Pokedex";
import Header from "../Header";

const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: ${({ theme }) => theme.colors.background};
`;

const PokedexSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90vw;
`;

const Tittle = styled.h1`
  text-decoration: bold;
`;

const HomePage = () => {
  return (
    <>
      <Main>
        <Header />
        <PokedexSection>
          <Tittle>Pokedex:</Tittle>
          <Pokedex />
        </PokedexSection>
      </Main>
    </>
  );
};

export default HomePage;
