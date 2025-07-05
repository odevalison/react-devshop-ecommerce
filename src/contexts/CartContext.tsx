import { createContext } from 'react';

import type { ProductInfos } from '../pages/home';

type CartContextData = {
  cart: CartInfos[];
  cartAmount: number;
  totalCart: string;
  addItemCart: (newItem: ProductInfos) => void;
  removeItemCart: (item: CartInfos) => void;
};

export type CartInfos = {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
};

export const CartContext = createContext({} as CartContextData);
