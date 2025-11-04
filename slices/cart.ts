import { TProduct } from '@/types/product';
import { slice } from 'killua';

export const cartSlice = slice({
  key: 'cart',
  defaultClient: [] as TProduct[],
  obfuscate: true,
  selectors: {
    cartIsEmpty: (value) => Boolean(!value.length),
    isItemInCart: (value, payload: string) =>
      value.some((product) => product._id === payload),
    totalCartPrice: (value) =>
      value.reduce((acc, product) => acc + parseFloat(product.price), 0),
    totalCartCount: (value) => value.length,
  },
  reducers: {
    addToCart: (value, payload: TProduct) => [...value, payload],
    removeFromCart: (value, payload: string) => [
      ...value.filter((product) => product._id !== payload),
    ],
    clearCart: () => [],
  },
});
