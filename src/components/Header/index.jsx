import styled from "styled-components";
import ThemeToggler from "../ThemeToggler";
import { Link } from "react-router-dom";
import pokemonLogo from "../../assets/pokemon_logo.svg";

const StyledHeader = styled.header`
  width: 100vw;
  height: 60px;
  background: #ff0000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
`;

const PokemonLogo = styled.img`
  height: 80%;
`;

const NavContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 50px;
  align-items: center;
  margin-right: 20px;
`;

const NavMenu = styled.nav`
  height: 100%;
`;

const NavList = styled.ul`
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavListItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: #fff;

  &:hover {
    background: #cc0000;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <PokemonLogo src={pokemonLogo} alt="pokemon-logo" />

      <NavContainer>
        <NavMenu>
          <NavList>
            <NavLink to={"/"}>
              <NavListItem>Home</NavListItem>
            </NavLink>
          </NavList>
        </NavMenu>

        <ThemeToggler />
      </NavContainer>
    </StyledHeader>
  );
};

export default Header;
