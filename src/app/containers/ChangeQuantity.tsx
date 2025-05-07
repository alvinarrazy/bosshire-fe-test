'use client';
import { Product } from '@/types/product';
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
  handleChangeCart: (productId: number, quantity: number) => Promise<void>;
  quantity: number;
  product: Product;
  disabled: boolean;
}

export default function ChangeQuantity({
  disabled,
  product,
  quantity,
  handleChangeCart,
}: Props) {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      gap={1}>
      <Button
        variant='outlined'
        color='primary'
        disabled={disabled || quantity === 0}
        onClick={() => handleChangeCart(product.id, quantity - 1)}
        sx={{ minWidth: 40 }}>
        -
      </Button>
      <TextField
        value={quantity || 0}
        disabled
        inputProps={{ style: { textAlign: 'center', width: 40 } }}
        size='small'
        variant='outlined'
      />
      <Button
        variant='outlined'
        color='primary'
        disabled={disabled}
        onClick={() => handleChangeCart(product.id, quantity + 1)}
        sx={{ minWidth: 40 }}>
        +
      </Button>
    </Box>
  );
}
