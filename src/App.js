import useLocalStorageState from "use-local-storage-state";
import "./App.css";
import BetterFakeWeather from "./components/BetterFakeWeather/BetterFakeWeather";
import { useEffect, useState } from "react";
import AlienPrototype from "./components/AlienPrototype/AlienProtopye";

function getSlug(title) {
  const slug = title
    .trim()
    .toLowerCase()
    .replaceAll(".", "-")
    .replaceAll(":", "-")
    .replaceAll("#", "")
    .replaceAll(" ", "-");
  return slug;
}
// console.log(getSlug(" Return.of the King"));
// console.log(getSlug(" Darkness.of the:#Aliens "));
const randomMessages = [
  "You make us mine!",
  "What a lovely day to plant!",
  "Planet Claire has pink air!",
  "Oxygen included! (Also poisonous gas ...)",
  "I love me a good pickaxe to mine more Crystal!",
  "Plants, yummy!",
  "The aliens are happy!",
  "This is our planet. Nice, huh?",
  "All our base are belong to us!",
  "You say we have a problem?",
  "DARKNESS!",
  "Life just doesn't work without Crystal!",
  "We need more aliens!",
  "NASA won't come up here. Too far for their inferior technology.",
  "The aliens are happy!",
  "Planet Claire has pink air!",
];

const zeroProgress = {
  aliens: 2,
  crystal: 0,
  crystalToMine: 2000,
  plants: 0,
  spaceships: 0,
  pickaxes: 0,
  level: 1,
};

function App() {
  const [component, setComponent] = useState("aliens0");
  // const [message, setMessage] = useState("");
  // const [progress, setProgress] = useLocalStorageState("progress", {
  //   defaultValue: zeroProgress,
  // });
  // const LevelTwo = {
  //   ...progress,
  //   crystalToMine: 5000,
  //   level: 2,
  // };
  // function handleBreed() {
  //   function alienBreeding(a) {
  //     if (a <= 100) {
  //       return Math.round(a * 1.3);
  //     }
  //     return Math.round(a * 1.03);
  //   }
  //   const newBreed = alienBreeding(progress.aliens);
  //   const newProgress = {
  //     ...progress,
  //     aliens: newBreed,
  //   };
  //   setProgress(newProgress);
  //   progress.aliens >= 100
  //     ? setMessage("Now we're a 100!")
  //     : setMessage("We need to breed!");
  // }

  // function handleMine() {
  //   let addCrystal = Math.round(progress.aliens / 5);
  //   if (progress.crystalToMine === 0) {
  //     addCrystal = 0;
  //     setMessage("No Crystal left to mine!");
  //   } else if (progress.crystalToMine <= addCrystal) {
  //     addCrystal = progress.crystalToMine;
  //     setMessage("Let the pickaxes go, our work is done her!");
  //   } else {
  //     addCrystal = Math.round(progress.aliens / 5);
  //     setMessage("We need more Crystal!");
  //   }
  //   const newProgress = {
  //     ...progress,
  //     crystal: progress.crystal + addCrystal,
  //     crystalToMine: Math.max(0, progress.crystalToMine - addCrystal),
  //   };
  //   // setCrystalToMine(crystalToMine - addCrystal);
  //   setProgress(newProgress);
  // }

  // function handleFarm() {
  //   const newPlant = Math.round(Number(progress.plants) + progress.aliens / 4);
  //   const newProgress = {
  //     ...progress,
  //     plants: newPlant,
  //   };
  //   setProgress(newProgress);
  //   setMessage("The red weed grows roots!");
  // }
  // function BuyButton({ onClick, price, product }) {
  //   return (
  //     <button
  //       onClick={() => {
  //         if (progress.crystal >= price) {
  //           const newProgress = {
  //             ...progress,
  //             crystal: progress.crystal - price,
  //             ...(product === "pickaxe"
  //               ? { pickaxes: progress.pickaxes + 1 }
  //               : {}),
  //             ...(product === "smallRocket"
  //               ? { spaceships: progress.spaceships + 1 }
  //               : {}),
  //           };
  //           setProgress(newProgress);
  //           setMessage("Bought something, yeah!");
  //         } else {
  //
  //           setProgress(progress);
  //           setMessage("We don't have enough crystal to buy this!");
  //         }
  //       }}
  //     >
  //       BUY!
  //     </button>
  //   );
  // }
  /*   function handleBuy({ price }) {
    // const rocketPrice = 100;
    if (progress.crystal >= price) {
      // const newStock = progress.spaceships + 1;
      console.log(price);
      const newProgress = {
        ...progress,
        crystal: progress.crystal - price,
        spaceships: progress.spaceships,
        pickaxes: progress.pickaxes + 1,
      };
      setProgress(newProgress);
      setMessage("Bought something, yeah!");
    } else {
      console.log(price);
      setProgress(progress);
      setMessage("We don't have enough crystal to buy this!");
    }
  } */

  // function handleDeath() {
  //   const DeathToll = Math.round(progress.aliens * 0.1);
  //   const newProgress = { ...progress, aliens: progress.aliens - DeathToll };
  //   setProgress(newProgress);
  //   setMessage("All aliens must die.");
  // }

  // function handleMainClick() {
  //   function getRandom() {
  //     return Math.floor(Math.random() * randomMessages.length);
  //   }
  //   const randomMessage = randomMessages[getRandom()];
  //   setMessage(randomMessage);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Components for reuse</h1>
      </header>
      <nav className="nav">
        <select
          id="navprov"
          className="select-button"
          value={component}
          onChange={(event) => setComponent(event.target.value)}
        >
          <option value="">Choose a component</option>
          <option value="weather">better fake weather 0.08</option>

          <option value="aliens0">alien prototype 0.15</option>
          <option value="slugs">generate slugs</option>
        </select>
      </nav>

      {component === "weather" ? <BetterFakeWeather /> : null}
      {component === "aliens0" ? <AlienPrototype /> : null}

      {/* <h2>Generating Slugs</h2>
        <p>(ALPHA TEST!!!)</p> */}

      <section>
        {/* <h2>Generating Aliens</h2>
        <p>(ALPHA TEST!!!)</p> */}

        {/* <p>For testing </p> */}
        {/* <button onClick={handleBreed}>BREED!</button>
        <button onClick={handleMine}>MINE CRYSTAL!</button>
        <button onClick={handleFarm}>FARM!</button>
        <button onClick={handleDeath}>GET OLD AND DIE!</button> */}
        {/* 
        <h3>
          ---- Level {progress.level} - Crystal Hill: {progress.crystalToMine}{" "}
          ----
        </h3> */}

        {/* <p>Aliens: {progress.aliens}</p>
        <p>Crystal: {progress.crystal}</p>
        <p>Plants: {progress.plants}</p>
        <p>Spaceships: {progress.spaceships}</p>
        <p> ⛏️ Pickaxes: {progress.pickaxes}</p>
        <h3>Message: {message}</h3> */}

        {/* <h3>Shop</h3>
        <ul>
          <li>
            ⛏️ Pickaxe: 100 Crystal
            <BuyButton price={prices.pickaxe} product="pickaxe">
              BUY!
            </BuyButton>
          </li>
          <li>
            ⚒️ Advanced Tools: {prices.advancedTools} Crystal
            <BuyButton price={prices.advancedTools} product="advancedTools">
              BUY!
            </BuyButton>
          </li>
          <li>
            🚀 Small Rocket: {prices.smallrocket} Crystal
            <BuyButton price={prices.smallrocket} product="smallRocket">
              BUY!
            </BuyButton>
          </li>
        </ul> */}
        <br></br>
        <p>{/* <button onClick={handleMainClick}>MAIN CLICK!</button> */}</p>
        {/* <p>
          <button onClick={() => setProgress(zeroProgress)}>RESET</button>
          <button onClick={() => setProgress(LevelTwo)}>LEVEL 2</button>
        </p> */}
        {/* {progress.aliens >= 100 ? (
          <span>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
            👾👾👾👾👾👾👾👾👾👾<br></br>
          </span>
        ) : (
          <p>👾👾</p>
        )} */}
      </section>
    </div>
  );
}

export default App;
