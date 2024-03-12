import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
const StyledRPG = styled.div`
  background-color: lightgray;
  max-width: 1024px;
`;
const StyledNav = styled.nav`
  color: white;
  background-color: rgb(82, 82, 83);
  display: flex;
  justify-content: space-evenly;
`;

const StyledFeedback = styled.div`
  font-size: 1.2rem;
  line-height: 1.2rem;
  padding: 0.5rem;
  text-align: left;
  font-weight: 600;
  color: rgb(240, 180, 00);
  background-color: black;
`;

const initialAttributes = {
  strength: 14,
  dexterity: 13,
  mind: 13,
  soul: 14,
  pool: 0,
};

export default function SimpleRPG() {
  const [attributes, setAttributes] = useLocalStorageState("attributes", {
    defaultValue: initialAttributes,
  });
  const [feedback, setFeedback] = useLocalStorageState("feedback", {
    defaultValue: "Press play to start!",
  });

  function getRandomAttributeScore() {
    const dI = Math.floor(Math.random() * 4 + 1);
    const dII = Math.floor(Math.random() * 4 + 1);
    const dIII = Math.floor(Math.random() * 4 + 1);
    return dI + dII + dIII + 6;
  }

  return (
    <StyledRPG>
      <h1>Simple RPG</h1>
      <StyledNav>
        <a>★ START not al link yet</a>
        <a>★ LOAD no link here as well</a>
        <a>★ SAVE at last no link</a>
      </StyledNav>
      <h3>Characterpage</h3>
      <p>
        Name: <input></input>
      </p>
      <ul>
        Attributes:
        <li>
          Strength: {attributes.strength}{" "}
          <button
            onClick={() => {
              const newStrength = attributes.strength + 1;
              const newPool = attributes.pool - 1;
              setAttributes(
                attributes.pool > 0 && attributes.strength < 19
                  ? {
                      ...attributes,
                      strength: newStrength,
                      pool: newPool,
                    }
                  : attributes
              );
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              const newStrength = attributes.strength - 1;
              const newPool = attributes.pool + 1;
              setAttributes(
                attributes.strength > 9
                  ? {
                      ...attributes,
                      strength: newStrength,
                      pool: newPool,
                    }
                  : attributes
              );
            }}
          >
            -
          </button>
        </li>
        <li>
          Dexterity: {attributes.dexterity}
          <button
            onClick={() => {
              const newDexterity = attributes.dexterity + 1;
              const newPool = attributes.pool - 1;

              setAttributes(
                attributes.pool > 0 && attributes.dexterity < 19
                  ? {
                      ...attributes,
                      dexterity: newDexterity,
                      pool: newPool,
                    }
                  : attributes
              );
              attributes.dexterity === 19
                ? setFeedback("You reached the max!")
                : setFeedback("Increased dexterity.");
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              const newDexterity = attributes.dexterity - 1;
              const newPool = attributes.pool + 1;
              setAttributes(
                attributes.dexterity > 9
                  ? {
                      ...attributes,
                      dexterity: newDexterity,
                      pool: newPool,
                    }
                  : attributes
              );
            }}
          >
            -
          </button>
        </li>
        <li>Mind: {attributes.mind}</li>
        <li>Soul: {attributes.soul}</li>
        <li>---pool(for testing only) ---: {attributes.pool}</li>
        <button
          onClick={() => {
            setAttributes({
              strength: getRandomAttributeScore(),
              dexterity: getRandomAttributeScore(),
              mind: getRandomAttributeScore(),
              soul: getRandomAttributeScore(),
            });
          }}
        >
          Reroll all attributes
        </button>
        <button onClick={() => setAttributes(initialAttributes)}>reset</button>
      </ul>
      <StyledFeedback>{feedback}</StyledFeedback>
    </StyledRPG>
  );
}
