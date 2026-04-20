import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

type RecurringPayment = {
  id: string;
  name: string;
  nextDate: string;
  amount: number;
  color: 'primary' | 'secondary' | 'success' | 'error';
};

const recurringPayments: RecurringPayment[] = [
  {
    id: 'rp-001',
    name: 'Netflix subscription',
    nextDate: '2026-04-15',
    amount: 15.99,
    color: 'error',
  },
  {
    id: 'rp-002',
    name: 'Rent',
    nextDate: '2026-05-01',
    amount: 1200,
    color: 'primary',
  },
  {
    id: 'rp-003',
    name: 'Gym membership',
    nextDate: '2026-05-05',
    amount: 39.99,
    color: 'success',
  },
  {
    id: 'rp-004',
    name: 'Internet',
    nextDate: '2026-05-10',
    amount: 59.9,
    color: 'secondary',
  },
];

function formatAmount(value: number) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function RecurringPaymentItem({ payment }: { payment: RecurringPayment }) {
  const theme = useTheme();
  const mainColor = theme.palette[payment.color].main;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'action.hover',
        px: 2,
        py: 1.5,
      }}
    >
      <Avatar
        sx={{
          bgcolor: alpha(mainColor, 0.12),
          color: mainColor,
          width: 40,
          height: 40,
          border: '1px solid',
          borderColor: alpha(mainColor, 0.2),
        }}
      >
        <Circle fontSize="small" />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" fontWeight={600}>
          {payment.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Next: {payment.nextDate}
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight={600}>
        {formatAmount(payment.amount)}
      </Typography>
    </Box>
  );
}

export function RecurringPayments() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader title="Recurring payments" />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recurringPayments.map((payment) => (
            <RecurringPaymentItem key={payment.id} payment={payment} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
