import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
  name: string;
  description: string;
  price: ReactNode;
  image?: string;
}

export default function ProductCard({
  children,
  name,
  description,
  price,
  image,
}: Props) {
  return (
    <Grid>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {image && (
          <CardMedia
            component='img'
            height='200'
            image={image}
            alt={name}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'>
            {name}
          </Typography>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={2}>
            <Typography
              variant='body2'
              color='text.secondary'>
              {description}
            </Typography>
            <Box>{price}</Box>
          </Box>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
