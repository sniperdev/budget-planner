'use client';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';

type TopBarProps = {
  drawerWidth: number;
  isMobile: boolean;
  onToggleDrawer: () => void;
};

const TopBar = ({ drawerWidth, isMobile, onToggleDrawer }: TopBarProps) => {
  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {isMobile && (
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={onToggleDrawer}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Add transaction
          </Button>
          <IconButton aria-label="notifications">
            <NotificationsIcon />
          </IconButton>
          <Chip
            label="domowy budżet"
            size="small"
            sx={{ bgcolor: 'action.hover' }}
          />
          <Avatar sx={{ width: 32, height: 32 }}>JD</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
