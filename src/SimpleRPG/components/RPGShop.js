import styled from "styled-components";

const StyledShopSection = styled.section`
  background-color: lightgray;
`;

export default function RPGShop({
  shopStock,
  setFeedback,
  basket,
  setBasket,
  party,
  setParty,
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
      <h2>Shop</h2>
      <section>
        <p>Party funds (Gold): {party.gold}</p>
        <ul>
          {shopStock.map((stock) => (
            <li className="shop-li" key={stock.name}>
              <span>{stock.emoji}</span>
              {stock.name}: <span>{stock.price} 🪙</span>
              <button
                onClick={() => {
                  let itemToBuy = {
                    name: stock.name,
                    price: stock.price,
                    quantity: 1,
                    feedback: stock.feedback,
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
                  setFeedback(stock.feedback);
                }}
              >
                Add to basket
              </button>
            </li>
          ))}
        </ul>
        <h3>Basket content:</h3>
        <ul>
          {basket.map((item) => (
            <li className="basket-li" key={item.name}>
              {item.quantity} {item.name}:{" "}
              <span>{item.price * item.quantity} 🪙</span>
            </li>
          ))}
        </ul>
        <p className="basket-sum">Sum: {basketSum} 🪙</p>
        <button
          onClick={() => {
            const currentFunds = party.gold;
            // .filter((progres) => progres.name === "Funds")
            // .map((progres) => progres.count)[0];
            basketSum <= currentFunds
              ? setFeedback("Bought!")
              : setFeedback(
                  "You don't have enough Gold. Go kill monsters and find loot!"
                );
            basketSum <= currentFunds
              ? setParty({ ...party, gold: party.gold - basketSum })
              : setFeedback(
                  "You don't have enough Gold. Go kill monsters and find loot! "
                );
          }}
        >
          BUY THIS STUFF!
        </button>
        <button onClick={() => setBasket([])}>reset basket</button>
        <br></br>
      </section>
    </>
  );
}
