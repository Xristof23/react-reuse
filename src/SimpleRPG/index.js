import { Chance } from "chance";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import {
  characterPresets,
  initialParty,
  shopInventory,
} from "./components/RPGData";
import RPGShop from "./components/RPGShop";
import "./SimpleRPG.css";

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

const StyledSword = styled.div`
  border: 4px solid rgb(107, 105, 105);
  width: 600px;
  height: 200px;
  clip-path: polygon(
    0% 43%,
    22% 42%,
    21% 00%,
    25% 00%,
    24% 41%,
    80% 39%,
    90% 45%,
    100% 50%,
    90% 55%,
    80% 61%,
    24% 59%,
    25% 100%,
    21% 100%,
    22% 58%,
    0% 57%
  );
  position: relative;
  top: 0px;
  right: 0px;
  font-size: 3.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 200px;

  color: rgb(240, 0, 0);
  padding: 4px;
  background-color: rgb(9, 8, 8);
  z-index: 1;
`;

const StyledHeadingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.1rem;
  background-color: rgb(250, 250, 250);
`;

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

const StyledAttributeList = styled.li`
  max-width: 20rem;
  display: grid;
  grid-template-columns: 3fr 0.5fr 0.5fr 0.5fr;

  padding: 0.1rem;
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
const StyledMainMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid red;
  max-width: 80%;
  background-color: rgb(240, 240, 240);
  position: relative;
  left: center;
`;
const StyledButton = styled.button`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  max-width: 80%;
  align-self: center;
  line-height: 2rem;
  margin: 0.5rem;
`;

function MainMenu() {
  return (
    <StyledMainMenu>
      <StyledButton>New game</StyledButton>
      <StyledButton disabled> Load game</StyledButton>

      <StyledButton disabled> Quit</StyledButton>
    </StyledMainMenu>
  );
}

const chance = new Chance();
const femaleName = chance.name({ gender: "female" });
// const randomGender = chance.gender({ extraGenders: "non-binary" });

export default function SimpleRPG() {
  const initialAttributes = {
    strength: 0,
    dexterity: 0,
    mind: 0,
    soul: 0,
    pool: 0,
    health: 0,
    mana: 0,
  };
  const [party, setParty] = useLocalStorageState("party", {
    defaultValue: initialParty,
  });

  const [attributes, setAttributes] = useLocalStorageState("attributes", {
    defaultValue: characterPresets[0].attributes,
  });
  const [character, setCharacter] = useLocalStorageState("character", {
    defaultValue: characterPresets[0],
  });

  const [feedback, setFeedback] = useLocalStorageState("feedback", {
    defaultValue: "Choose LOAD or NEW to start!",
  });
  const [option, setOption] = useState("fighter1");

  function fightingVariables(strength, dexterity) {
    const meleeAttack = Math.max(0, strength - 10) + dexterity / 4;
    setFeedback(`Attack: ${meleeAttack}`);
    return meleeAttack;
  }

  function getRandomAttributeScore() {
    const dI = Math.floor(Math.random() * 4 + 1);
    const dII = Math.floor(Math.random() * 4 + 1);
    const dIII = Math.floor(Math.random() * 4 + 1);
    return dI + dII + dIII + 6;
  }

  const [basket, setBasket] = useState([]);

  // function fightTest(
  //   strength,
  //   dexterity,
  //   damage,
  //   weaponskill,
  //   shield,
  //   health,
  //   armor
  // ) {const meleeAttack: Math.max(0, (strength - 10)) + dexterity/4;
  //   const fightingPower = {
  //     attack: Math.max(0, strength - 10),
  //     damage: damage * weaponskill,
  //     defense: dexterity / 2 + shield,
  //     armor: armor,
  //   };
  // }

  let leatherHelmet = {
    id: "hg000",
    name: "Prayer Cap",
    isEquipped: false,
    armor: 1,
    type: "armor",
    weight: 1,
    price: 5,
    image: null,
  };

  leatherHelmet = {
    ...leatherHelmet,
    price: leatherHelmet.armor * 6,
  };

  console.log(leatherHelmet);

  function calculateHealth() {
    return (
      Math.round(
        (attributes.strength * 10 +
          attributes.dexterity * 5 +
          attributes.mind * 2 +
          attributes.soul * 2) /
          5
      ) +
      (character.level - 1) * 2
    );
  }

  function calculateHP(index) {
    return (
      Math.round(
        (characterPresets[index].attributes.strength * 10 +
          characterPresets[index].attributes.dexterity * 5 +
          characterPresets[index].attributes.mind * 2 +
          characterPresets[index].attributes.soul * 2) /
          5
      ) +
      (characterPresets[index].level - 1) *
        2 *
        characterPresets[index].classinfo.healthFactor
    );
  }
  // simpler machen handlePresets(option) z.b, zusätzlicher knopf muss weg
  function handlePresets() {
    let newAttributes = {
      strength: 1,
      dexterity: 1,
      mind: 1,
      soul: 1,
      pool: 1,
      health: 1,
      mana: 1,
    };
    if (option === "fighter1") {
      const testArray = characterPresets.map((character) =>
        character.preset === "fighter1" ? character.attributes : attributes
      );
      newAttributes = testArray[0];
      console.log(newAttributes);
      setFeedback(`You chose ${option}`);
    } else {
      setFeedback("Do you want to use a preset?");
    }
    setAttributes(newAttributes);
  }
  // useEffect() oder sonstwie besser kontrollieren
  setAttributes({ ...attributes, health: calculateHealth() });

  return (
    <StyledRPG>
      <StyledHeadingContainer>
        <StyledSword>DEAD SIMPLE RPG</StyledSword>
        {/* <div className="shape"></div> */}
        {/* <div className="dirk"></div>
        <div className="sword"></div> */}
      </StyledHeadingContainer>
      <MainMenu />
      {/* <StyledNav>
        <a>★ START not a link yet</a>
        <a>★ LOAD no link here as well</a>
        <a>★ SAVE at last no link</a>
      </StyledNav> */}
      <h2>Basic Information</h2>
      <StyledP>
        (Todo: add button to show/hide explanations) You can choose a character
        preset, change it as you like (within the rules) or create a new
        character.
      </StyledP>
      <StyledH3>Character Classes</StyledH3>
      <StyledP>
        Fighter, rogue, mage and cleric. Classes have no specific Fighter:
        Rogue: Rogues prefer lighter armor and rely more on dexterity then
        strength
      </StyledP>
      <StyledH4>Fighter</StyledH4>
      <StyledP>Most important Attribut for fighters is strength</StyledP>
      <StyledH4>Class combinations(optional feature feature)</StyledH4>
      <StyledH3>Attributes</StyledH3>
      <StyledP>
        Rules for changing attributes are: No Attribute can be more then 19 at
        the start.
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
      <br></br>
      <h2>Character Creation</h2>
      Character presets:{" "}
      <select
        id="character-select"
        className="select-button"
        value={option}
        onChange={(event) => {
          setOption(event.target.value);
          console.log(option);
        }}
      >
        <option value="">Choose a character preset</option>
        <option value="fighter1">Female fighter</option>
        <option value="fighter2">Male fighter</option>
        <option value="rogue1">Female rogue</option>
        <option value="rogue2">Male rogue</option>
      </select>
      <button onClick={handlePresets}>Use chosen preset</button>
      <p>
        <label htmlFor="characterName">
          Character Name:
          <input
            id="characterName"
            value={character.name}
            onChange={(event) =>
              setCharacter({ ...character, name: event.target.value })
            }
          ></input>
        </label>
        Gender: {character.gender}
      </p>
      <p>Health: {attributes.health}</p>
      <ul>
        Attributes:
        <StyledAttributeList>
          Strength: <span>{attributes.strength}</span>
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
        </StyledAttributeList>
        <StyledAttributeList>
          Dexterity:<span> {attributes.dexterity}</span>
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
        </StyledAttributeList>
        <StyledAttributeList>
          Mind: <span>{attributes.mind}</span>
          <button
            onClick={() => {
              const newMind = attributes.mind + 1;
              const newPool = attributes.pool - 1;
              setAttributes(
                attributes.pool > 0 && attributes.mind < 19
                  ? {
                      ...attributes,
                      mind: newMind,
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
              const newMind = attributes.mind - 1;
              const newPool = attributes.pool + 1;
              setAttributes(
                attributes.mind > 9
                  ? {
                      ...attributes,
                      mind: newMind,
                      pool: newPool,
                    }
                  : attributes
              );
            }}
          >
            -
          </button>
        </StyledAttributeList>
        <StyledAttributeList>
          Soul: <span>{attributes.soul}</span>{" "}
          <button
            onClick={() => {
              const newSoul = attributes.mind + 1;
              const newPool = attributes.pool - 1;
              setAttributes(
                attributes.pool > 0 && attributes.mind < 19
                  ? {
                      ...attributes,
                      soul: newSoul,
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
              const newSoul = attributes.mind - 1;
              const newPool = attributes.pool + 1;
              setAttributes(
                attributes.mind > 9
                  ? {
                      ...attributes,
                      soul: newSoul,
                      pool: newPool,
                    }
                  : attributes
              );
            }}
          >
            -
          </button>
        </StyledAttributeList>
        <StyledAttributeList>Pool: {attributes.pool}</StyledAttributeList>
        <li>
          For testing Sum/Score(how good is the roll?):{" "}
          {attributes.strength +
            attributes.dexterity +
            attributes.mind +
            attributes.soul}
          (min: 36 max: 72)
        </li>
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
        <button onClick={() => setAttributes(initialAttributes)}>
          reset attributes
        </button>
        <button onClick={() => setCharacter(characterPresets[0])}>
          reset character
        </button>
        <button onClick={() => setFeedback("Press play to start!")}>
          reset feed
        </button>
      </ul>
      <button onClick={() => fightingVariables(17, 15)}>fight</button>
      <StyledFeedback>{feedback}</StyledFeedback>
      <RPGShop
        shopStock={shopInventory}
        setParty={setParty}
        setFeedback={setFeedback}
        feedback={feedback}
        basket={basket}
        setBasket={setBasket}
        party={party}
      />
      <button onClick={() => setParty(initialParty)}>reset party</button>
      <br></br>
    </StyledRPG>
  );
}
