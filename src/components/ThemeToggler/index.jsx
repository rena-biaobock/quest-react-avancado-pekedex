import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

const TogglerButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  align-self: flex-end;
  background: #cc0000;

  &:hover {
    background: #ff0000;
  }
`;

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TogglerButton onClick={toggleTheme}>
      <span>{theme === "light" ? "☀️" : "🌙"}</span>
    </TogglerButton>
  );
}
