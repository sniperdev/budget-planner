'use client';

import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

import AppDrawer from './app-drawer';
import { MonthlyBudget } from './MonthlyBudget';
import { RecentTransactions } from './RecentTransactions';
import { RecurringPayments } from './RecurringPayments';
import { StatsSection } from './StatsSection';
import TopBar from './top-bar';

const drawerWidth = 240;

export function DashboardView() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        onToggleDrawer={handleDrawerToggle}
      />
      <AppDrawer
        drawerWidth={drawerWidth}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <StatsSection />
        <RecentTransactions />
        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
          }}
        >
          <MonthlyBudget />
          <RecurringPayments />
        </Box>
      </Box>
    </Box>
  );
}
