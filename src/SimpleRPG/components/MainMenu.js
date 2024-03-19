import styled from "styled-components";

const StyledMainMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* border: 1px solid red; */
  max-width: 80%;
  background-color: rgb(38, 38, 38);
  margin: auto;
`;
const StyledButton = styled.button`
  font-size: 1.8rem;
  height: 2.5rem;
  font-weight: 600;
  text-align: center;
  max-width: 80%;
  align-self: center;
  line-height: 1.8rem;
  margin: 0.5rem;
  background-color: lightgray;
`;

export default function MainMenu({ setComponent }) {
  return (
    <StyledMainMenu>
      <StyledButton onClick={setComponent("newgame")}>New game</StyledButton>

      <StyledButton disabled> Load game</StyledButton>
      <StyledButton onClick={setComponent("gear")}>Gear</StyledButton>
      <StyledButton disabled> Quit</StyledButton>
    </StyledMainMenu>
  );
}
