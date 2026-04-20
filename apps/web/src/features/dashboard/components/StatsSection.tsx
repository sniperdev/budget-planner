import {
  AccountBalanceWalletOutlined,
  ArrowDownward,
  ArrowUpward,
  PieChartOutline,
  ShowChart,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

import { StatCard, StatCardProps } from './StatCard';

const statTiles: StatCardProps[] = [
  {
    title: 'Total Balance',
    value: '$12,450.75',
    icon: <AccountBalanceWalletOutlined fontSize="small" />,
    iconBgColor: 'primary.light',
    iconColor: 'primary.main',
    trend: {
      value: '+12.5%',
      icon: <ShowChart fontSize="small" />,
      color: 'success.main',
    },
  },
  {
    title: 'Income this month',
    value: '$4,250.00',
    icon: <ArrowUpward fontSize="small" />,
    iconBgColor: 'success.light',
    iconColor: 'success.main',
    trend: {
      value: '+8.2%',
      icon: <ArrowUpward fontSize="small" />,
      color: 'success.main',
    },
  },
  {
    title: 'Expenses this month',
    value: '$2,980.40',
    icon: <ShoppingCartOutlined fontSize="small" />,
    iconBgColor: 'error.light',
    iconColor: 'error.main',
    trend: {
      value: '-3.4%',
      icon: <ArrowDownward fontSize="small" />,
      color: 'error.main',
    },
  },
  {
    title: 'Budget used',
    value: '62%',
    icon: <PieChartOutline fontSize="small" />,
    iconBgColor: 'warning.light',
    iconColor: 'warning.main',
    trend: {
      value: '+4.1%',
      icon: <ArrowUpward fontSize="small" />,
      color: 'warning.main',
    },
  },
];

export function StatsSection() {
  return (
    <Box
      sx={{
        mt: 3,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
      }}
    >
      {statTiles.map((tile) => (
        <StatCard key={tile.title} {...tile} />
      ))}
    </Box>
  );
}

