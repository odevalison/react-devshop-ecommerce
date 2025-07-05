import { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router";

export function CartPage() {
  const { cart, removeItemCart, addItemCart, totalCart } =
    useContext(CartContext);

  return (
    <>
      <main className="w-7xl max-w-full p-5 mx-auto">
        <h1 className="font-bold text-2xl mb-5 text-center text-zinc-900">
          Meu carrinho
        </h1>

        {cart.length !== 0 ? (
          cart.map((product) => (
            <section
              key={product.id}
              className="w-7xl max-w-full flex items-center justify-between md:gap-5 text-lg border-b border-zinc-300"
            >
              <img
                className="w-40 object-contain bg-zinc-300 transition-all hover:scale-95"
                src={product.cover}
                alt={product.title}
              />

              <div className="md:w-full flex flex-col-reverse md:flex-row-reverse md:justify-around gap-2">
                <div className="flex items-center md:justify-center gap-3">
                  <button
                    className="transition-all bg-zinc-900 hover:bg-zinc-950 rounded-md text-zinc-300 font-medium flex item-center justify-center px-2 cursor-pointer shadow-md"
                    onClick={() => removeItemCart(product)}
                  >
                    -
                  </button>
                  <p className="font-bold text-zinc-900">{product.amount}</p>
                  <button
                    className="transition-all bg-zinc-900 hover:bg-zinc-950 rounded-md text-zinc-300 font-medium flex item-center justify-center px-2 cursor-pointer shadow-md"
                    onClick={() => addItemCart(product)}
                  >
                    +
                  </button>
                </div>

                <div className="text-zinc-900 text-base">
                  <strong>Preço:</strong>
                  <p className="inline font-medium text-zinc-900/80">
                    {" "}
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="text-zinc-900 text-base">
                  <strong>Subtotal:</strong>
                  <p className="inline font-medium text-zinc-900/80">
                    {" "}
                    {formatPrice(product.total)}
                  </p>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-zinc-900/80 font-medium text-xl">
              Ops, seu carrinho está vazio...
            </p>
            <Link
              to="/"
              className="transition-all bg-zinc-900 hover:bg-zinc-950  font-medium text-zinc-100 px-6 py-2 rounded-md text-lg shadow-md"
            >
              Acessar produtos
            </Link>
          </div>
        )}

        {cart.length !== 0 && (
          <div className="mt-4 text-xl text-right text-zinc-900">
            <strong>Total:</strong>
            <p className="inline font-medium text-zinc-900/80"> {totalCart}</p>
          </div>
        )}
      </main>
    </>
  );
}
