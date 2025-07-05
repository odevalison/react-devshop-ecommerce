import { useContext, useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";

import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
import { Link } from "react-router";

export type ProductInfos = {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
};

export function HomePage() {
  const { addItemCart } = useContext(CartContext);

  const [products, setProducts] = useState<ProductInfos[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (e) {
        if (e instanceof Error) {
          console.error("mensagem de erro:", e.message);
        }
      }
    }

    getProducts();
  }, []);

  function handleAddCartItem(itemToAdd: ProductInfos) {
    addItemCart(itemToAdd);

    toast.success("Item adicionado no carrinho!", {
      style: {
        borderRadius: 10,
        backgroundColor: "#18181b",
        color: "#e4e4e7",
      },
      duration: 1000,
    });
  }

  return (
    <>
      <main className="w-7xl max-w-full p-5 mx-auto">
        <h1 className="font-bold text-2xl mb-5 text-center text-zinc-900">
          Produtos em alta
        </h1>

        <div className="w-full grid gap-5 grid-cols-2 md:gap-10 md:grid-cols-3">
          {products.map((product) => (
            <section key={product.id}>
              <div>
                <Link to={`/product/${product.id}`}>
                  <img
                    className="max-h-72 md:max-h-80 transition-all hover:scale-105 object-contain"
                    src={product.cover}
                    alt={product.title}
                  />
                </Link>

                <p className="max-w-full font-medium my-2 overflow-hidden whitespace-nowrap text-ellipsis">
                  {product.title}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <strong className="text-zinc-900/70 text-lg">
                  {formatPrice(product.price)}
                </strong>

                <button
                  className="transition-all bg-zinc-900 hover:bg-zinc-950 text-zinc-300 p-2 rounded-md cursor-pointer"
                  onClick={() => handleAddCartItem(product)}
                >
                  <BsCartPlus size={22} />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
