'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { registerSchema } from '@repo/api';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAppDispatch } from '../../../store/hooks';
import { useRegisterMutation } from '../../../store/slices/auth/auth.api';
import { setSession } from '../../../store/slices/auth/auth.slice';

type RegisterFormValues = z.infer<typeof registerSchema>;

type RegisterErrorPayload = {
  data?: {
    message?: string;
  };
};

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const [registerError, setRegisterError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await registerMutation(data).unwrap();
      dispatch(setSession(result));
      setRegisterError(undefined);
    } catch (error) {
      const message =
        typeof error === 'string'
          ? error
          : (error as RegisterErrorPayload)?.data?.message;
      setRegisterError(message || 'An unexpected error occurred');
    }
  };

  return (
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
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            loading={isLoading}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        {registerError && <Typography color="error">{registerError}</Typography>}
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" passHref>
              <Button variant="text" color="primary">
                Login
              </Button>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}


