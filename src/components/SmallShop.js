import "./AlienPrototype/AlienPrototype.css";

export default function Shop({
  shopStock,
  progress,
  setProgress,
  setMessage,
  message,
}) {
  return (
    <>
      <button
        className="shop-start"
        onClick={() => console.log("clicked shopping")}
      >
        Small Shop
      </button>
      <section className="shop">
        <ul>
          {shopStock.map((stock) => (
            <li className="shop-li" key={stock.id}>
              <span>{stock.emoji}</span>
              {stock.name}: <span>{stock.price} 💎</span>
              <button
                onClick={() => {
                  let itemToBuy = {
                    id: stock.id,
                    name: stock.name,
                    price: stock.price,
                    emoji: stock.emoji,
                    message: stock.message,
                    type: stock.type,
                    quantity: 1,
                  };
                  function buyThis() {
                    setMessage(itemToBuy.message);
                    setProgress(
                      progress.map((progres) =>
                        progres.name === "Crystal"
                          ? {
                              ...progres,
                              count: progres.count - itemToBuy.price,
                            }
                          : progres
                      )
                    );
                    setProgress(
                      itemToBuy.type === "tool"
                        ? progress.map((progres) =>
                            progres.name === "Tool Power"
                              ? {
                                  ...progres,
                                  count:
                                    progres.count +
                                    Math.round(Math.log(itemToBuy.price)),
                                }
                              : progres
                          )
                        : progress
                    );
                  }
                  const currentCrystal = progress
                    .filter((progres) => progres.name === "Crystal")
                    .map((progres) => progres.count)[0];
                  itemToBuy.price <= currentCrystal
                    ? buyThis()
                    : setMessage(
                        "We don't have enough Crystal yet. Let's mine more!"
                      );
                }}
              >
                Buy!
              </button>
            </li>
          ))}
        </ul>
        <br></br>
      </section>
    </>
  );
}
