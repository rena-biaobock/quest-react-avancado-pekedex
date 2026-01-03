import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggler() {
  const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Toggle Theme</button>;
}
