import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { initialProgress, levels } from "../AlienData/AlienData";
import { shopStock } from "../AlienData/AlienData";
import { randomMessages } from "../AlienData/AlienData";
import "./AlienPrototype.css";
import Shop from "../Shop";

import Chance from "chance";
const chance = new Chance();
const alienName = chance.word();

function alienBreeding(a) {
  if (a <= 100) {
    return Math.round(a * 1.3);
  }
  return Math.round(a * 1.03);
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
  const [basket, setBasket] = useState([]);

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
  console.log(progress);
  return (
    <section className="section-game">
      <h1>My cute aliens (PRE-ALPHA TEST!!!)</h1>

      <h2>
        - Level {levels[0].level} - Crystal Hill: {crystalToMine} Crystal{}-
      </h2>
      <button onClick={handleStart}>START GAME!</button>
      <div className="progress-display">
        {progress.map((progres) => (
          <p key={progres.id}>
            <span>{progres.emoji}</span>
            {progres.name}: {progres.count}
          </p>
        ))}
      </div>

      <h3 className="message-main">Message: {message}</h3>
      <Shop
        shopStock={shopStock}
        progress={progress}
        setProgress={setProgress}
        setMessage={setMessage}
        message={message}
        setBasket={setBasket}
        basket={basket}
      />
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
            setBasket([]);
          }}
        >
          RESET
        </button>
        <button onClick={handleBreed}>BREED! (testing only)</button>
        <button onClick={handleMine}>MINE CRYSTAL!</button>
        {/* <button onClick={handleFarm}>FARM!</button>
      <button onClick={handleDeath}>GET OLD AND DIE!</button> */}
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
