import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import React from 'react';

type TransactionType = 'income' | 'expense';

type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
};

const recentTransactions: Transaction[] = [
  {
    id: 'tx-001',
    date: '2026-04-18',
    description: 'Salary payout',
    category: 'Income',
    amount: 4200.0,
    type: 'income',
  },
  {
    id: 'tx-002',
    date: '2026-04-17',
    description: 'Groceries',
    category: 'Food',
    amount: 84.25,
    type: 'expense',
  },
  {
    id: 'tx-003',
    date: '2026-04-16',
    description: 'Gym membership',
    category: 'Health',
    amount: 39.99,
    type: 'expense',
  },
  {
    id: 'tx-004',
    date: '2026-04-15',
    description: 'Freelance project',
    category: 'Income',
    amount: 650.0,
    type: 'income',
  },
  {
    id: 'tx-005',
    date: '2026-04-14',
    description: 'Internet bill',
    category: 'Utilities',
    amount: 59.9,
    type: 'expense',
  },
];

function formatAmount(amount: number, type: TransactionType) {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function RecentTransactions() {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ mt: 3 }}>
      <CardHeader title="Recent transactions" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '999px',
                        px: 1.25,
                        py: 0.25,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {transaction.category}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: '999px',
                        px: 1.25,
                        py: 0.25,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        bgcolor: alpha(
                          transaction.type === 'income'
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          0.12,
                        ),
                        color:
                          transaction.type === 'income'
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                        border: '1px solid',
                        borderColor: alpha(
                          transaction.type === 'income'
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                          0.2,
                        ),
                      }}
                    >
                      {transaction.type}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color={
                        transaction.type === 'income'
                          ? 'success.main'
                          : 'error.main'
                      }
                    >
                      {formatAmount(transaction.amount, transaction.type)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}
