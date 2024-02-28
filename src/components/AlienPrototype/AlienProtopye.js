import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { initialProgress, levels } from "../AlienData/AlienData";
import { shopStock } from "../AlienData/AlienData";
import { randomMessages } from "../AlienData/AlienData";

function alienBreeding(a) {
  if (a <= 100) {
    return Math.round(a * 1.3);
  }
  return Math.round(a * 1.03);
}

function BuyButton({
  onClick,
  shopStock,
  product,
  progress,
  setProgress,
  setMessage,
}) {
  return (
    <button
      onClick={(price) => {
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

export default function AlienPrototype() {
  const [progress, setProgress] = useLocalStorageState("progress", {
    defaultValue: initialProgress,
  });
  const [message, setMessage] = useState("Press start to play!");
  const [crystalToMine, setCrystalToMine] = useLocalStorageState(
    "crystalToMine",
    { defaultValue: 2000 }
  );

  function handleClick() {
    function getRandom() {
      return Math.floor(Math.random() * randomMessages.length);
    }
    const randomMessage = randomMessages[getRandom()];
    setMessage(randomMessage);

    setProgress(
      progress.map((progres) => ({ ...progres, count: progres.count++ }))
    );
  }

  function handleStart() {
    setMessage("Game started!");
  }

  function handleBreed() {
    setProgress(
      progress.map((progres) =>
        progres.name === "Aliens"
          ? { ...progres, count: progres.count * 2 }
          : progres
      )
    );
  }
  function handleMine() {
    let mineCrystal = Math.round(progress[0].count / 4);

    if (crystalToMine === 0) {
      mineCrystal = 0;
      setMessage("No Crystal left to mine!");
    } else if (crystalToMine <= mineCrystal) {
      mineCrystal = crystalToMine;
      setMessage("Let the pickaxes go, our work is done her!");
    } else {
      mineCrystal = Math.round(progress[0].count / 4);
      setMessage("We need more Crystal!");
    }

    setCrystalToMine(Math.max(0, crystalToMine - mineCrystal));
    setProgress(
      progress.map((progres) =>
        progres.name === "Crystal"
          ? { ...progres, count: progres.count + mineCrystal }
          : progres
      )
    );
  }
  // useEffect(() => {
  //   handleStart();
  // }, []);

  // console.log(progress);
  return (
    <section>
      <h1>My cute aliens</h1>
      <p>(ALPHA TEST!!!)</p>

      <p>For testing </p>
      <button onClick={handleBreed}>BREED Fast!</button>
      <button onClick={handleMine}>MINE CRYSTAL!</button>
      {/* <button onClick={handleFarm}>FARM!</button>
      <button onClick={handleDeath}>GET OLD AND DIE!</button> */}

      <h2>
        - Level {levels[0].level} - Crystal Hill: {crystalToMine} Crystal{}-
      </h2>
      <button onClick={handleStart}>START GAME!</button>

      {progress.map((progres) => (
        <p key={progres.id}>
          <span>{progres.emoji}</span>
          {progres.name}: {progres.count}
        </p>
      ))}

      <h3>Message: {message}</h3>

      <h3>Shop</h3>
      <ul>
        <li>
          ⛏️ Pickaxe: 100 Crystal
          <BuyButton price={shopStock[1].price} product="pickaxe">
            BUY!
          </BuyButton>
        </li>
        {/* <li>
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
        </li> */}
      </ul>
      <br></br>
      <p>
        <button className="main-button" onClick={handleClick}>
          CLICK ME!
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            setProgress(initialProgress);
            setCrystalToMine(2000);
          }}
        >
          RESET
        </button>
        {/* <button onClick={() => setProgress(LevelTwo)}>LEVEL 2</button> */}
      </p>
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
  );
}
