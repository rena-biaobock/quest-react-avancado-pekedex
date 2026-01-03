import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  align-self: center;
  padding: 10px;
  border: none;
  background: oklch(0.4583 0.2437 300.28);
  color: white;
  border-radius: 10px;
  transition: 0.3s;
  font-weight: 700;

  &:hover {
    background: oklch(0.6198 0.2437 300.28);
    cursor: pointer;
  }
`;

const LoadMoreButton = ({ onClick }) => {
  return <Button onClick={onClick}>CARREGAR MAIS</Button>;
};

export default LoadMoreButton;
