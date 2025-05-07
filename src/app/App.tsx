'use client';
import store, { useAppDispatch } from '@/store';
import { fetchUser } from '@/store/users';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function App({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <Provider store={store}>
      <HoC> {children}</HoC>
    </Provider>
  );
}

function HoC({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch user data when the app is mounted
    dispatch(fetchUser());
  }, []);

  return children;
}
