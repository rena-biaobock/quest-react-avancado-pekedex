import styled from "styled-components";

const Button = styled.button`
  width: 180px;
  align-self: center;
  padding: 10px;
  border: none;
  background: #cc0000;
  color: white;
  border-radius: 10px;
  transition: 0.3s;
  font-weight: 700;
  margin: 20px 0px;

  &:hover {
    background: #ff0000;
    cursor: pointer;
  }
`;

const LoadMoreButton = ({ onClick }) => {
  return <Button onClick={onClick}>CARREGAR MAIS</Button>;
};

export default LoadMoreButton;
