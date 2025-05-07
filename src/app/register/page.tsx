'use client';

import useFormReducer from '@/hooks/useFormReducer';
import { register } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  email: string;
}

const InitState: State = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
};

export default function Register() {
  const [{ username, password, loading, confirmPassword, email }, updateState] =
    useFormReducer(InitState);
  const router = useRouter();

  async function handleRegister() {
    if (password !== confirmPassword) {
      return alert('Password harus sama!');
    }
    updateState({ loading: true });
    try {
      await register({ username, password, email });
      router.push('/login');
    } catch {
    } finally {
      updateState({ loading: false });
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
                Register to start your journey
              </Typography>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    updateState({ email: e.currentTarget.value })
                  }
                  placeholder='Email'
                />
              </Grid>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    updateState({ username: e.currentTarget.value })
                  }
                  placeholder='Username'
                />
              </Grid>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    updateState({ password: e.currentTarget.value })
                  }
                  placeholder='Password'
                  type='password'
                />
              </Grid>

              <Grid
                sx={{ justifyContent: 'center', display: 'flex' }}
                className='mb-3'>
                <Input
                  disabled={loading}
                  onChange={(e) =>
                    updateState({ confirmPassword: e.currentTarget.value })
                  }
                  placeholder='Confirm Password'
                  type='password'
                />
              </Grid>

              <Grid>
                <Button
                  disabled={
                    loading || !username || !password || !confirmPassword
                  }
                  onClick={handleRegister}
                  className='mb-3 w-100'>
                  {loading ? 'Loading...' : 'Register'}
                </Button>
              </Grid>

              <Grid>
                <Button
                  disabled={loading}
                  className='w-100'>
                  <Link
                    className='text-center'
                    href='/login'>
                    Login
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
