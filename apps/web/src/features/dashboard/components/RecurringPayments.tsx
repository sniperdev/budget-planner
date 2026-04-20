import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import React from 'react';

type RecurringPayment = {
  id: string;
  name: string;
  nextDate: string;
  amount: number;
  iconBgColor: string;
  iconColor: string;
};

const recurringPayments: RecurringPayment[] = [
  {
    id: 'rp-001',
    name: 'Netflix subscription',
    nextDate: '2026-04-15',
    amount: 15.99,
    iconBgColor: 'error.light',
    iconColor: 'error.main',
  },
  {
    id: 'rp-002',
    name: 'Rent',
    nextDate: '2026-05-01',
    amount: 1200,
    iconBgColor: 'primary.light',
    iconColor: 'primary.main',
  },
  {
    id: 'rp-003',
    name: 'Gym membership',
    nextDate: '2026-05-05',
    amount: 39.99,
    iconBgColor: 'success.light',
    iconColor: 'success.main',
  },
  {
    id: 'rp-004',
    name: 'Internet',
    nextDate: '2026-05-10',
    amount: 59.9,
    iconBgColor: 'secondary.light',
    iconColor: 'secondary.main',
  },
];

function formatAmount(value: number) {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function RecurringPaymentItem({ payment }: { payment: RecurringPayment }) {
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
          bgcolor: payment.iconBgColor,
          color: payment.iconColor,
          width: 40,
          height: 40,
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
