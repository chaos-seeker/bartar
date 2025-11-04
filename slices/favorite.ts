import { TProduct } from '@/types/product';
import { slice } from 'killua';

export const favoriteSlice = slice({
  key: 'favorite',
  defaultClient: [] as TProduct[],
  defaultServer: [] as TProduct[],
  obfuscate: true,
  selectors: {
    favoriteIsEmpty: (value) => Boolean(!value.length),
    isItemInFavorite: (value, payload: string) =>
      value.some((product) => product._id === payload),
    totalFavoriteCount: (value) => value.length,
  },
  reducers: {
    addToFavorite: (value, payload: TProduct) => [...value, payload],
    removeFromFavorite: (value, payload: string) => [
      ...value.filter((product) => product._id !== payload),
    ],
    clearFavorite: () => [],
  },
});
