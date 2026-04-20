import {
  AccountBalanceWalletOutlined,
  ArrowDownward,
  ArrowUpward,
  PieChartOutline,
  ShowChart,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

import { StatCard, StatCardProps } from './StatCard';

type StatTile = Omit<StatCardProps, 'iconBgColor' | 'iconColor'> & {
  tone: 'primary' | 'success' | 'error' | 'warning';
};

const statTiles: StatTile[] = [
  {
    title: 'Total Balance',
    value: '$12,450.75',
    icon: <AccountBalanceWalletOutlined fontSize="small" />,
    tone: 'primary',
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
    tone: 'success',
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
    tone: 'error',
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
    tone: 'warning',
    trend: {
      value: '+4.1%',
      icon: <ArrowUpward fontSize="small" />,
      color: 'warning.main',
    },
  },
];

export function StatsSection() {
  const theme = useTheme();

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
      {statTiles.map((tile) => {
        const mainColor = theme.palette[tile.tone].main;
        const iconBgColor = alpha(mainColor, 0.12);

        return (
          <StatCard
            key={tile.title}
            {...tile}
            iconBgColor={iconBgColor}
            iconColor={mainColor}
          />
        );
      })}
    </Box>
  );
}
