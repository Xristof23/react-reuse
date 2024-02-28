import useLocalStorageState from "use-local-storage-state";
import "./App.css";
import BetterFakeWeather from "./components/BetterFakeWeather/BetterFakeWeather";
import { useEffect, useState } from "react";

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
];

const zeroProgress = {
  aliens: 2,
  crystal: 0,
  plants: 0,
  spaceships: 0,
  pickaxes: 0,
};

const prices = {
  pickaxe: 100,
  advancedTools: 350,
  smallrocket: 1000,
};

function App() {
  const [message, setMessage] = useState("");
  const [crystalToMine, setCrystalToMine] = useState(2000);
  const [progress, setProgress] = useLocalStorageState("progress", {
    defaultValue: zeroProgress,
  });

  function handleBreed() {
    function alienBreeding(a) {
      if (a <= 100) {
        return Math.round(a * 1.3);
      }
      return Math.round(a * 1.03);
    }
    const newBreed = alienBreeding(progress.aliens);
    const newProgress = {
      ...progress,
      aliens: newBreed,
    };
    setProgress(newProgress);
    progress.aliens >= 100
      ? setMessage("Now we're a 100!")
      : setMessage("We need to breed!");
  }

  // useEffect(() => {
  //   progress.aliens >= 666
  //     ? setMessage("We reached the number of the beast!")
  //     : setMessage("We need to breed!");
  // }, [progress.aliens]);

  function handleMine() {
    const addCrystal = Math.round(progress.aliens / 5);
    const newProgress = {
      ...progress,
      crystal: progress.crystal + addCrystal,
    };
    setCrystalToMine(crystalToMine - addCrystal);
    setProgress(newProgress);
    setMessage("We need more Crystal!");
  }

  function handleFarm() {
    const newPlant = Math.round(Number(progress.plants) + progress.aliens / 4);
    const newProgress = {
      ...progress,
      plants: newPlant,
    };
    setProgress(newProgress);
    setMessage("The red weed grows roots!");
  }
  function BuyButton({ onClick, price, product }) {
    return (
      <button
        onClick={() => {
          if (progress.crystal >= price) {
            const newProgress = {
              ...progress,
              crystal: progress.crystal - price,
              ...(product === "pickaxe"
                ? { pickaxes: progress.pickaxes + 1 }
                : {}),
              ...(product === "smallRocket"
                ? { spaceships: progress.spaceships + 1 }
                : {}),
            };
            setProgress(newProgress);
            setMessage("Bought something, yeah!");
          } else {
            console.log("no deal");
            setProgress(progress);
            setMessage("We don't have enough crystal to buy this!");
          }
        }}
      >
        BUY!
      </button>
    );
  }
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

  function handleDeath() {
    const DeathToll = Math.round(progress.aliens * 0.1);
    const newProgress = { ...progress, aliens: progress.aliens - DeathToll };
    setProgress(newProgress);
    setMessage("All aliens must die.");
  }

  function handleMainClick() {
    //D10
    function getD09Roll() {
      return Math.floor(Math.random() * 10);
    }
    const randomMessage = randomMessages[getD09Roll()];
    setMessage(randomMessage);
    console.log(randomMessage);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Components for reuse</h1>
      </header>
      <h2>Better Fake Weather</h2>
      <p>
        (ALPHA TEST!!!) Ever wanted to "generate" your own weather? (ALPHA
        TEST!!!)
      </p>
      <section>
        <BetterFakeWeather />
        <h2>Generating Slugs</h2>
        <p>(ALPHA TEST!!!)</p>
      </section>
      <section>
        <h2>Generating Aliens</h2>
        <p>(ALPHA TEST!!!)</p>

        <p>For testing </p>
        <button onClick={handleBreed}>BREED!</button>
        <button onClick={handleMine}>MINE CRYSTAL!</button>
        <button onClick={handleFarm}>FARM!</button>
        <button onClick={handleDeath}>GET OLD AND DIE!</button>

        <h3>---- Level 1 - Crystal Hill: {crystalToMine} ----</h3>

        <p>Aliens: {progress.aliens}</p>
        <p>Crystal: {progress.crystal}</p>
        <p>Plants: {progress.plants}</p>
        <p>Spaceships: {progress.spaceships}</p>
        <p> ⛏️ Pickaxes: {progress.pickaxes}</p>
        <h3>Message: {message}</h3>

        <h3>Shop</h3>
        <ul>
          <li>
            ⛏️ Pickaxe: 100 Crystal
            <BuyButton price={prices.pickaxe} product="pickaxe">
              BUY!
            </BuyButton>
          </li>
          <li>
            ⚒️ Advanced Tools: {prices.advancedTools} Crystal
            <BuyButton price={prices.smallrocket} product="advancedTools">
              BUY!
            </BuyButton>
          </li>
          <li>
            🚀 Small Rocket: {prices.smallrocket} Crystal
            <BuyButton price={prices.smallrocket} product="smallRocket">
              BUY!
            </BuyButton>
          </li>
        </ul>
        <br></br>
        <p>
          <button className="main-button" onClick={handleMainClick}>
            GO ALIENS GO!
          </button>
        </p>
        {progress.aliens >= 100 ? (
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
        )}
      </section>
    </div>
  );
}

export default App;
