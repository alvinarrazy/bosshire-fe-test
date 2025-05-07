import { Action, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { slice as users } from './users';

export const store = configureStore({
  reducer: {
    userState: users.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

export interface IAction<T> extends Action {
  message?: string;
  payload?: T;
}

export interface IAsyncProcess {
  request: boolean;
  succeed: boolean;
  failed: boolean;
  message?: string | null;
}

export interface IService<T = unknown> {
  result?: T;
  error?: string;
}
