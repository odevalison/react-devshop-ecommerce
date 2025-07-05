import { Link } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";

import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { cartAmount } = useContext(CartContext);

  return (
    <>
      <header className="w-full px-6 py-4 bg-zinc-900 flex items-center justify-around shadow-md sticky top-0 z-50">
        <Link to="/" className="font-medium text-3xl text-zinc-300">
          <span className="font-bold text-sky-500">Dev</span>Shop
        </Link>

        <Link to="/cart" className="text-zinc-300 relative">
          <FiShoppingCart size={26} />
          {cartAmount > 0 && (
            <span className="absolute -right-3 -top-3 p-2 bg-sky-500 w-6 h-6 rounded-full flex items-center justify-center text-zinc-300 font-bold shadow-md">
              {cartAmount}
            </span>
          )}
        </Link>
      </header>
    </>
  );
}
