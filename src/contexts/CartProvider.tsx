import { useState } from "react";

import type { ProductInfos } from "../pages/home";
import { formatPrice } from "../utils/formatPrice";
import { CartContext, type CartInfos } from "./CartContext";

interface CartProviderProps {
  children: React.ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartInfos[]>([]);
  const [totalCart, setTotalCart] = useState("");

  function totalResultCart(productsList: CartInfos[]) {
    const myCart = productsList;
    const totalResult = myCart.reduce((acc, currentProduct) => {
      return (acc += currentProduct.total);
    }, 0);

    setTotalCart(formatPrice(totalResult));
  }

  function addItemCart(newItem: ProductInfos) {
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      const cartListRef = cart;

      cartListRef[indexItem].amount += 1;
      cartListRef[indexItem].total += cartListRef[indexItem].price;

      setCart(cartListRef);
      totalResultCart(cartListRef);

      // para de executar a funcao.
      return;
    }

    const itemData = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((allProducts) => [...allProducts, itemData]);
    totalResultCart([...cart, itemData]);
  }

  function removeItemCart(itemToRemove: CartInfos) {
    const indexItem = cart.findIndex(
      (product) => product.id === itemToRemove.id
    );

    if (cart[indexItem]?.amount > 1) {
      const cartListRef = cart;

      cartListRef[indexItem].amount -= 1;
      cartListRef[indexItem].total -= cartListRef[indexItem].price;

      setCart(cartListRef);
      totalResultCart(cartListRef);
      return;
    }

    const newCartItems = cart.filter(
      (product) => product.id !== itemToRemove.id
    );

    setCart(newCartItems);
    totalResultCart(newCartItems);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        totalCart,
        addItemCart,
        removeItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
