import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { BsCartPlus } from "react-icons/bs";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { type ProductInfos } from "../home";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../contexts/CartContext";

export function ProductPage() {
  const { addItemCart } = useContext(CartContext);

  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductInfos>();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.status === 404) {
            toast.error("Item não encontrado!", {
              style: {
                borderRadius: 10,
                backgroundColor: "#18181b",
                color: "#e4e4e7",
              },
              duration: 1000,
            });

            navigate("/");
            return;
          }
        }
      }
    }

    getProduct();
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

    navigate("/cart");
  }

  return (
    <>
      <main className="w-7xl max-w-full flex flex-col items-center my-5 md:mt-10 md:mb-0 mx-auto px-5 md:px-0 text-zinc-900">
        <h1 className="font-bold text-2xl mb-5 text-center text-zinc-900">
          Informações do produto
        </h1>

        <div className="flex flex-col items-center md:flex md:flex-row md:items-stretch md:justify-center gap-5">
          <div className="md:max-w-3/6">
            <img
              className="w-80 h-80"
              src={product?.cover}
              alt={product?.title}
            />
          </div>

          <section className="md:max-w-3/6 flex flex-col justify-evenly">
            <div className="flex flex-col divide-y divide-zinc-900/50 *:py-2">
              <h1 className="font-semibold text-xl text-zinc-900">
                {product?.title}
              </h1>

              <p className="text-zinc-900/90">{product?.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <strong className="text-zinc-900/70 text-lg">
                {formatPrice(product?.price as number)}
              </strong>

              <button
                className="transition-all bg-zinc-900 hover:bg-zinc-950 text-zinc-300 p-2 rounded-md cursor-pointer"
                onClick={() => handleAddCartItem(product as ProductInfos)}
              >
                <BsCartPlus size={22} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
