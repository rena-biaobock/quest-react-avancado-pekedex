import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import iconSun from "../../assets/icons/sun.png";
import iconMoon from "../../assets/icons/moon.png";

const TogglerButton = styled.button`
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  background: transparent;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Icon = styled.img`
  height: 100%;
`;

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TogglerButton onClick={toggleTheme}>
      <span>
        {theme === "light" ? (
          <Icon src={iconSun} alt="icon-sun" />
        ) : (
          <Icon src={iconMoon} alt="icon-monn" />
        )}
      </span>
    </TogglerButton>
  );
}
