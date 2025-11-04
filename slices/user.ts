import { TUser } from '@/types/user';
import { slice } from 'killua';

export const userSlice = slice({
  key: 'user',
  defaultClient: null as TUser,
  defaultServer: null as TUser,
  obfuscate: true,
  selectors: {
    isAuthenticated: (value) => Boolean(value),
    getUser: (value) => value,
    getUsername: (value) => value?.username ?? '',
  },
  reducers: {
    setUser: (value, payload: NonNullable<TUser>) => payload,
    clearUser: () => null,
  },
});
