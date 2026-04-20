import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Typography,
} from '@mui/material';
import React from 'react';

type BudgetCategory = {
  name: string;
  used: number;
  total: number;
  color: string;
};

const budgetCategories: BudgetCategory[] = [
  { name: 'Food', used: 485, total: 600, color: 'warning.main' },
  { name: 'Housing', used: 1200, total: 1500, color: 'primary.main' },
  { name: 'Transport', used: 210, total: 300, color: 'success.main' },
  { name: 'Entertainment', used: 140, total: 250, color: 'secondary.main' },
];

function formatCurrency(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export function MonthlyBudget() {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardHeader title="Monthly budget" />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {budgetCategories.map((category) => {
            const percentUsed = Math.min(
              Math.round((category.used / category.total) * 100),
              100,
            );

            return (
              <Box
                key={category.name}
                sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(category.used)}/{formatCurrency(category.total)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentUsed}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    bgcolor: 'action.hover',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: category.color,
                    },
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {percentUsed}% used
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
