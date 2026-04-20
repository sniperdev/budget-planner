'use client';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

type AppDrawerProps = {
  drawerWidth: number;
  isMobile: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
};

const AppDrawer = ({ drawerWidth, isMobile, mobileOpen, onToggle }: AppDrawerProps) => {
  const drawerContent = (
    <List>
      <ListItem disablePadding key="Dashboard">
        <ListItemButton
          sx={{
            borderRadius: 2,
            '&.Mui-selected': { bgcolor: '#3f51b5', color: 'white' },
          }}
          selected
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding key="Transactions">
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding key="Budgets">
        <ListItemButton>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Budgets" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding key="Settings">
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? mobileOpen : true}
      onClose={onToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', padding: 2 },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default AppDrawer;
