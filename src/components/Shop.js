import "./AlienPrototype/AlienPrototype.css";

export default function Shop({
  shopStock,
  progress,
  setProgress,
  setMessage,
  message,
  basket,
  setBasket,
}) {
  let basketSum = 0;
  if (basket.length === 0) {
    basketSum = 0;
  } else {
    basketSum = basket
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b);
  }

  return (
    <>
      <h2>Shop (aliens only)</h2>
      <section className="shop">
        <ul>
          {shopStock.map((stock) => (
            <li className="shop-li" key={stock.name}>
              <span>{stock.emoji}</span>
              {stock.name}: <span>{stock.price} 💎</span>
              <button
                onClick={() => {
                  let itemToBuy = {
                    name: stock.name,
                    price: stock.price,
                    quantity: 1,
                  };
                  const testBasket = basket.filter(
                    (item) => item.name === stock.name
                  );
                  const restBasket = basket.filter(
                    (item) => item.name !== stock.name
                  );

                  testBasket.length === 0
                    ? setBasket([...basket, itemToBuy])
                    : setBasket([
                        ...restBasket,
                        {
                          ...testBasket[0],
                          quantity: testBasket[0].quantity + 1,
                        },
                      ]);
                }}
              >
                Add to Basket
              </button>
            </li>
          ))}
        </ul>
        <h3>Basket content:</h3>
        <ul>
          {basket.map((item) => (
            <li className="basket-li" key={item.name}>
              {item.quantity} {item.name}:{" "}
              <span>{item.price * item.quantity} 💎</span>
            </li>
          ))}
        </ul>
        <p className="basket-sum">Sum: {basketSum} 💎</p>
        <button
          onClick={() => {
            const currentCrystal = progress
              .filter((progres) => progres.name === "Crystal")
              .map((progres) => progres.count)[0];
            basketSum <= currentCrystal
              ? setMessage("Bought!")
              : setMessage(
                  "We don't have enough Crystal yet. Let's mine more!"
                );
            basketSum <= currentCrystal
              ? setProgress(
                  progress.map((progres) =>
                    progres.name === "Crystal"
                      ? { ...progres, count: progres.count - basketSum }
                      : progres
                  )
                )
              : setMessage(
                  "We don't have enough Crystal yet. Let's mine more!"
                );
          }}
        >
          BUY THIS STUFF!
        </button>
        <br></br>
      </section>
    </>
  );
}
