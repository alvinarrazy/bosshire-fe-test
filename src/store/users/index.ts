import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { LoginRequest, UserState } from '@/types/auth';
import { createAppAsyncThunk } from '../utils';
import { login, logout } from '@/services/auth';

const initialState: UserState = {
  user: null,
  initialized: false,
};

const namespace = 'users';
export const selfState = ({ userState }: RootState) => userState;

export const processLogin = createAppAsyncThunk(
  `${namespace}/processLogin`,
  async (payload: LoginRequest, { dispatch }) => {
    const res = await login(payload);

    dispatch(update({ user: res.data.user, initialized: true }));
  },
  {
    condition(_, { getState }) {
      const { userState } = getState();
      return !userState.initialized;
    },
  },
);

/** Get user data from the server incase if already logged in */
export const fetchUser = createAppAsyncThunk(
  `${namespace}/fetchUser`,
  async (_, { dispatch }) => {
    const res = await login(undefined);

    dispatch(update({ user: res.data.user, initialized: true }));
  },
  {
    condition(_, { getState }) {
      const { userState } = getState();
      return !userState.initialized;
    },
  },
);

export const processLogout = createAppAsyncThunk(
  `${namespace}/processLogout`,
  async (_, { dispatch }) => {
    await logout();

    dispatch(clear());
  },
);

export const slice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    clear: (state) => {
      state.initialized = false;
      state.user = null;
    },
    update: (state, { payload }: { payload: Partial<UserState> }) => {
      Object.assign(state, payload);
    },
  },
});

export const { clear, update } = slice.actions;
