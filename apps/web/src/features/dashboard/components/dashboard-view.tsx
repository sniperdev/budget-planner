'use client';

import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

import AppDrawer from './app-drawer';
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
      </Box>
    </Box>
  );
}
