'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loginSchema } from '@repo/api';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '../../store/hooks';
import { useLoginMutation } from '../../store/slices/auth/auth.api';
import { setSession } from '../../store/slices/auth/auth.slice';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function SignIn() {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [loginError, setLoginError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setSession(result));
      setLoginError(undefined);
    } catch {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
          padding: 4,
          gap: 2,
        }}
      >
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message || ''}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message || ''}
            />
            <Button
              type="submit"
              loading={isLoading}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
          {loginError && (
            <Typography color="error">
              {loginError}
            </Typography>
          )}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Don&#39;t have an account?{' '}
              <Link href="/register" passHref>
                <Button variant="text" color="primary">
                  Register
                </Button>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}