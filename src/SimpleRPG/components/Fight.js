import { characterPresets } from "./RPGData";
import styled from "styled-components";

export default function fightTest(
  strength,
  dexterity,
  damage,
  weaponskill,
  shield,
  health,
  armor
) {
  const fightingPower = {
    attack: Math.max(0, strength - 10),
    damage: damage * weaponskill,
    defense: dexterity / 2 + shield,
    armor: armor,
  };
}
