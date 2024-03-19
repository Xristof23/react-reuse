import styled from "styled-components";

const StyledSection = styled.section`
  background-color: lightgray;
`;

const Gallery = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Sword = styled.div`
  border: 4px solid rgb(107, 105, 105);
  width: 36px;
  height: 120px;
  clip-path: polygon(
    40% 100%,
    40% 80%,
    0% 80%,
    0% 75%,
    38% 75%,
    38% 15%,
    50% 0,
    62% 15%,
    62% 75%,
    100% 75%,
    100% 80%,
    60% 80%,
    60% 100%
  );

  color: black;
  padding: 4px;
  background-color: rgb(9, 8, 8);
  z-index: 1;
`;
const StyledDirk = styled.div`
  border: 4px solid rgb(107, 105, 105);
  width: 30px;
  height: 75px;
  clip-path: polygon(
    40% 100%,
    40% 80%,
    0% 80%,
    0% 75%,
    38% 75%,
    48% 5%,
    50% 0,
    52% 5%,
    62% 75%,
    100% 75%,
    100% 80%,
    60% 80%,
    60% 100%
  );

  font-size: 1rem;

  color: black;
  padding: 4px;
  background-color: rgb(9, 8, 8);
  z-index: 1;
  margin: 4px;
`;
const Spear = styled.div`
  border: 4px solid rgb(107, 105, 105);
  width: 30px;
  height: 200px;
  clip-path: polygon(
    40% 100%,
    40% 20%,
    20% 40%,
    20% 38%,
    50% 0,
    80% 38%,
    80% 40%,
    60% 20%,
    60% 100%,
    40% 100%
  );

  color: black;
  padding: 4px;
  background-color: rgb(9, 8, 8);
  z-index: 1;
`;

const Club = styled.div`
  border: 4px solid rgb(107, 105, 105);
  width: 36px;
  height: 120px;
  clip-path: polygon(
    40% 100%,
    30% 30%,
    30% 10%,
    35% 5%,
    40% 0%,
    60% 0,
    65% 5%,
    70% 10%,
    70% 30%,
    60% 100%
  );

  color: black;
  padding: 4px;
  background-color: rgb(9, 8, 8);
  z-index: 1;
`;

export default function Gear() {
  return (
    <StyledSection>
      <h1>Gear</h1>
      <Gallery>
        <StyledDirk />
        <Sword />
        <Club />
        <Spear />
      </Gallery>
    </StyledSection>
  );
}
