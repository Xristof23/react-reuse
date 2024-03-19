import { Chance } from "chance";
import { useId } from "react";

const chance = new Chance();
const femaleName = chance.name({ gender: "female" });
const maleName = chance.name({ gender: "male" });

// const randomGender = chance.gender({ extraGenders: "non-binary" });

//Geartest gear in named object

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
//Geartest gear in array

const headgear = [
  {
    id: "hg001",
    name: "Stylish Hood",
    isEquipped: false,
    armor: 1,
    type: "armor",
    weight: 1,
    price: 6,
    image: null,
  },

  {
    id: "hg002",
    name: "Prayer Cap",
    isEquipped: false,
    armor: 2,
    type: "armor",
    weight: 2,
    price: 6,
    image: null,
  },
  {
    id: "hg003",
    name: "Padded Leather Cap",
    isEquipped: false,
    armor: 2,
    type: "armor",
    weight: 2,
    price: 6,
    image: null,
  },

  {
    id: "hg004",
    name: "Simple Leather Helmet",
    isEquipped: false,
    armor: 3,
    type: "armor",
    weight: 3,
    price: 15,
    image: null,
  },
  {
    id: "hg005",
    name: "Riveted Leather Helmet",
    isEquipped: false,
    armor: 4,
    type: "armor",
    weight: 3.5,
    price: 30,
    image: null,
  },
  {
    id: "hg006",
    name: "Simple Iron Helmet",
    isEquipped: false,
    armor: 6,
    type: "armor",
    weight: 5,
    price: 100,
    image: null,
  },
];
export const initialParty = {
  characters: [
    {
      name: femaleName,
      classinfo: { class: "fighter", healthFactor: 5 },
      gender: "female",
      age: 42,
      ingametime: 0,
      level: 1,
      experience: 0,
      attributes: {
        strength: 19,
        dexterity: 17,
        mind: 15,
        soul: 11,
        pool: 0,
        health: 65,
        mana: 0,
      },
    },
  ],
  gold: 200,
  carrycapacity: 100,
};

export const characterPresets = [
  {
    preset: "fighter1",
    name: femaleName,
    classinfo: { class: "fighter", healthFactor: 5 },
    gender: "female",
    age: 42,
    ingametime: 0,
    level: 1,
    experience: 0,
    attributes: {
      strength: 19,
      dexterity: 17,
      mind: 15,
      soul: 11,
      pool: 0,
      health: 65,
      mana: 0,
    },
    skills: {
      swords: 3,
      daggers: 1,
      clubs: 0,
      shield: 2,
    },
    gear: {
      head: "Leather Helmet",
      upperbody: "Padded Leather",
      legs: "Leather Trousers",
      offhand: "Wooden Shield",
      mainhand: "Dagger",
    },
  },
  {
    preset: "fighter2",
    name: maleName,
    class: "fighter",
    gender: "male",
    age: 25,
    ingametime: 0,
    level: 1,
    experience: 0,
    attributes: {
      strength: 18,
      dexterity: 18,
      mind: 10,
      soul: 16,
      pool: 0,
      health: 20,
      mana: 0,
    },
  },
];

export const shopInventory = [
  {
    id: 0,
    name: "Simple Club",
    type: "weapon",
    hands: 1,
    damage: [3, 4, 5, 6],
    damagetypes: ["blunt"],
    image: null,
    price: 5,
    classes: ["fighter", "mage", "thief", "priest"],
    feedback: "Beat on the brat. With a club.",
  },
  {
    id: 1,
    name: "Quarterstaff",
    type: "weapon",
    hands: 2,
    damage: [4, 5, 6, 7],
    damagetypes: ["blunt"],
    image: null,
    price: 7,
    classes: ["fighter", "mage", "thief", "priest"],
    feedback: "It's a sturdy stick. Non magic, meh.",
  },

  {
    id: 2,
    name: "Knife",
    type: "weapon",
    hands: 1,
    damage: [3, 4, 5, 6],
    damagetypes: ["pierce", "slash"],
    image: null,
    emoji: "🔪",
    price: 8,
    classes: ["fighter", "mage", "thief", "priest"],
    feedback: "You can never have to many knives!",
  },

  {
    id: 3,
    name: "Farmer's Flail",
    type: "weapon",
    hands: 1,
    damage: [3, 4, 5, 6],
    damagetypes: ["blunt"],
    image: null,
    price: 8,
    classes: ["fighter", "mage", "thief", "priest"],
    feedback: "You can't fail with a flail.",
  },

  {
    id: 616,
    name: "Mushroom",
    type: "consumable",
    hands: 1,
    damage: [],
    damagetypes: [],
    image: null,
    emoji: "🍄",
    price: 25,
    effects: "psychoberserk",
    classes: ["fighter", "mage", "thief", "priest"],
    feedback: "Feel the mushroom power!",
  },
];

const NPCs = [
  { name: "Fucking Hans", class: "Fighter", level: 3 },
  { name: "Courtney Hatred", class: "Rogue", level: 4 },
  { name: "Xaide", class: "Mage", level: 5 },
  { name: "Suso Sumbitch", class: "Fighter", level: 7 },
];
