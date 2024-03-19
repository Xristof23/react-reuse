import { Chance } from "chance";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import { useEffect, useState } from "react";
import {
  characterPresets,
  initialParty,
  shopInventory,
} from "./components/RPGData";
import "./SimpleRPG.css";
import RPGShop from "./components/RPGShop";

import MainMenu from "./components/MainMenu";
import Gear from "./components/Gear";
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
  /* top: 8px;
  left: 8px; */
  font-size: 3.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 200px;
  margin: 0.5rem;

  color: rgb(240, 0, 0);
  padding: 4px;
  background-color: rgb(38, 38, 38);
  z-index: 1;
`;

const StyledSection = styled.section`
  background-color: lightgray;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  margin: 0.1rem;
  background-color: rgb(0, 0, 0);
`;

const StyledRPG = styled.div`
  background-color: black;
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

export default function SimpleRPG() {
  const [component, setComponent] = useState("menu");
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
      <StyledHeader>
        <StyledSword>DEAD SIMPLE RPG</StyledSword>
        {/* <div className="shape"></div> */}
        {/* <div className="dirk"></div>
        <div className="sword"></div> */}
      </StyledHeader>
      <MainMenu setComponent={setComponent} />
      {/* <StyledNav>
        <a>★ START not a link yet</a>
        <a>★ LOAD no link here as well</a>
        <a>★ SAVE at last no link</a>
      </StyledNav> */}
      <Gear />
      <StyledSection>
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
      </StyledSection>
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
