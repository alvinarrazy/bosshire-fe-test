'use client';

import Link from 'next/link';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/store';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { processLogout } from '@/store/users';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogout = async () => {
    await dispatch(processLogout());
    handleClose();
    router.push('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            <Link href='/'>Home</Link>
          </Typography>
          <Button
            ref={anchorEl}
            color='inherit'
            onClick={handleOpen}>
            {user?.username}
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl.current}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
