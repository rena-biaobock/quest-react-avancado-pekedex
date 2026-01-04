import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

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
          <Icon src="../../../public/sun.png" alt="icon-sun" />
        ) : (
          <Icon src="../../../public/moon.png" alt="icon-monn" />
        )}
      </span>
    </TogglerButton>
  );
}
