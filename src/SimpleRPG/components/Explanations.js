import styled from "styled-components";

const StyledH3 = styled.h3`
  text-align: left;
  font-size: 1.2rem;
  margin: 0.2rem;
`;

const StyledH4 = styled.h3`
  text-align: left;
  font-size: 1.1rem;
  margin: 0.2rem;
`;

const StyledP = styled.p`
  text-align: left;
  margin: 0.1rem;
  background-color: rgb(250, 250, 250);
`;

const StyledSection = styled.section`
  background-color: lightgray;
`;

export default function Explanations() {
  <StyledSection>
    <h1>Basic Information</h1>
    <StyledP>
      (Todo: add button to show/hide explanations) You can choose a character
      preset, change it as you like (within the rules) or create a new
      character.
    </StyledP>
    <StyledH3>Character Classes</StyledH3>
    <StyledP>
      Fighter, rogue, mage and cleric. Classes have no specific Fighter: Rogue:
      Rogues prefer lighter armor and rely more on dexterity then strength
    </StyledP>
    <StyledH4>Fighter</StyledH4>
    <StyledP>Most important Attribut for fighters is strength</StyledP>
    <StyledH4>Class combinations(optional feature feature)</StyledH4>
    <StyledH3>Attributes</StyledH3>
    <StyledP>
      Rules for changing attributes are: No Attribute can be more then 19 at the
      start.
    </StyledP>
    <StyledH4>Strength</StyledH4>
    <StyledP>
      Strength is the most important Attribut for fighters. Characters need
      Strength to do more melee damage. Also Group strength is relevant
    </StyledP>
    <StyledH4>Health</StyledH4>
    <StyledP>
      Health is a derived attribute and is automatically calculated from the
      level and the four basic attributes Strength, Dexterity. Strength is the
      most important. Fighters have the most helath, mages the least.
    </StyledP>
  </StyledSection>;
}
