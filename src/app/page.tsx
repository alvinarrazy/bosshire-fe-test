'use client';
import useFormReducer from '@/hooks/useFormReducer';
import React, { useEffect, useMemo, useRef } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import ChangeQuantity from './containers/ChangeQuantity';
import { CartItem, Product } from '@/types/product';
import { getCartItems, getProducts, setCartItems } from '@/services/product';
import { useAppSelector } from '@/store';

interface State {
  loading: boolean;
  loadingCartChanging: boolean;
  products: Product[];
  cartItems: CartItem[];
  page: number;
}

const InitState: State = {
  loading: true,
  loadingCartChanging: false,
  products: [],
  cartItems: [],
  page: 1,
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [
    { products, loading, cartItems, page, loadingCartChanging },
    updateState,
  ] = useFormReducer(InitState);
  const user = useAppSelector((state) => state.userState.user);

  const cartHashMap = useMemo(() => {
    const hash: Record<string, number> = {};
    cartItems.forEach((cart) => {
      if (cart.id) hash[cart.id] = cart.quantity;
    });
    return hash;
  }, [cartItems]);

  function getPrice(product: Product) {
    return (
      <Box
        display='flex'
        justifyContent='flex-end'>
        <Typography
          variant='h6'
          color='primary'>
          Rp{product.price.toLocaleString('id-ID')}
        </Typography>
      </Box>
    );
  }

  async function loadMenu() {
    updateState({ loading: true });
    try {
      const { data } = await getProducts();
      updateState({ products: data });
      await loadCart();
    } finally {
      updateState({ loading: false });
    }
  }

  async function loadCart() {
    if (!user) return;
    updateState({ loading: true });
    try {
      const data = await getCartItems(user.id);
      updateState({ cartItems: data.products });
    } finally {
      updateState({ loading: false });
    }
  }

  async function handleChangeCart(productId: number, quantity: number) {
    if (!user) return;
    try {
      updateState({ loadingCartChanging: true });
      const cartItemIdx = cartItems.findIndex((cart) => cart.id === productId);
      if (cartItemIdx > -1) {
        const newCartItems = [...cartItems];
        newCartItems[cartItemIdx].quantity = quantity;
        const data = await setCartItems(user.id, newCartItems);
        updateState({ cartItems: data.products });
      } else {
        const newCartItem = {
          id: productId,
          quantity,
        };
        const data = await setCartItems(user.id, [...cartItems, newCartItem]);
        updateState({ cartItems: data.products });
      }
    } finally {
      updateState({ loadingCartChanging: false });
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 5 }}>
        <Grid
          container
          spacing={4}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              variant='rectangular'
              width={360}
              height={200}
              key={index}
            />
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <main ref={containerRef}>
      <Container sx={{ py: 5 }}>
        <Grid
          container
          spacing={4}>
          {products.map((product) => (
            <Grid
              size={4}
              key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <CardMedia
                  component='img'
                  height='200'
                  image={product.image}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant='h5'
                    component='div'>
                    {product.title}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  {getPrice(product)}
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <ChangeQuantity
                    handleChangeCart={handleChangeCart}
                    quantity={cartHashMap[product.id]}
                    disabled={loadingCartChanging}
                    product={product}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <CartFloating cartItems={cartItems} restaurantId={restaurantId} /> */}
    </main>
  );
}
