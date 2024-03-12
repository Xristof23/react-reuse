import { useState } from "react";
import "./BetterFakeWeather.css";

function rainFallProphecy() {
  let rainFall = "No rain";
  if (getD6Roll() === 1) {
    rainFall = "It's raining cats and dogs";
    return rainFall;
  } else if (getD6Roll() === 2) {
    rainFall = "It's raining again";
    return rainFall;
  } else if (getD6Roll() === 3) {
    rainFall = "Waiting for the sun";
    return rainFall;
  } else {
    rainFall = "Let the sunshine in";
    return rainFall;
  }
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const date = new Date();
let month = months[date.getMonth()];
let day = weekdays[date.getDay()];

function getD6Roll() {
  return Math.floor(Math.random() * 6) + 1;
}
function randomSign() {
  if (Math.random() > 0.5) return Number(-1);
  return 1;
}

export default function BetterFakeWeather({ isGoodWeather, temperature }) {
  const [fakeGoodWeather, setFakeGoodWeather] = useState(true);

  const fakeTemperature =
    10 + randomSign() * getD6Roll() + randomSign() * getD6Roll();

  return (
    <>
      <h2>Better Fake Weather</h2>
      <p>
        (ALPHA TEST!!!) Ever wanted to "generate" your own weather? (ALPHA
        TEST!!!)
      </p>
      <section className="weather-container">
        <p className="smilie">
          {fakeGoodWeather ? <span>🌞</span> : <span>⛈️</span>}
        </p>
        <p className="temperature">{fakeTemperature} °C</p>
        <p className="temperature"> {rainFallProphecy()}</p>
      </section>
      <p className="white-space"></p>
    </>
  );
}
