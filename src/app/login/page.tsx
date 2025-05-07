'use client';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { processLogin } from '@/store/users';
import { useAppDispatch } from '@/store';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function handleLogin() {
    setLoading(true);
    try {
      await dispatch(processLogin({ username, password }));
      router.push('/');
    } catch {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <main>
        <div
          style={{
            backgroundImage: `url(/landingBg.jpg)`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Container>
            <Card className='p-5 shadow-sm'>
              <Typography
                variant='h3'
                className='display-4 text-center mb-3'>
                Welcome
              </Typography>
              <Typography className='text-muted text-center mb-5'>
                Login to your account
              </Typography>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  placeholder='Username'
                />
              </Grid>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder='Password'
                  type='password'
                />
              </Grid>

              <Grid>
                <Button
                  disabled={loading || !username || !password}
                  onClick={handleLogin}
                  className='mb-3 w-100'>
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </Grid>

              <Grid>
                <Button
                  disabled={loading}
                  className='w-100'>
                  <Link
                    className='text-center'
                    href='/register'>
                    Register
                  </Link>
                </Button>
              </Grid>
            </Card>
          </Container>
        </div>
      </main>
    </div>
  );
}
