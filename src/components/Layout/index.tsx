import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { CSSObject, useTheme, styled, Theme } from '@mui/material/styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Outlet } from 'react-router';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import * as React from 'react';

import { DrawerMenu } from './constants';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.sharp,
  }),
  overflowX: 'hidden',
  width: drawerWidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  overflowX: 'hidden',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  justifyContent: 'flex-end',
  alignItems: 'center',
  display: 'flex',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  width: drawerWidth,
  flexShrink: 0,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/sign-in');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between', display: 'flex' }}>
          <IconButton
            sx={{
              marginRight: 5,
              ...(open && { visibility: 'hidden' }),
            }}
            onClick={handleDrawerOpen}
            aria-label="open drawer"
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="Logout">
            <IconButton
              aria-label="open drawer"
              onClick={handleLogout}
              color="inherit"
              edge="start"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: '#1976d2' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon sx={{ color: 'white' }} />
            ) : (
              <ChevronLeftIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ backgroundColor: '#1976d2', height: '100%' }}>
          {DrawerMenu.map((menuItem) => (
            <NavLink
              style={{ color: 'white' }}
              to={menuItem.route}
              key={menuItem.name}
            >
              <ListItem sx={{ display: 'block' }} disablePadding>
                <ListItemButton
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: 'center',
                      mr: open ? 3 : 'auto',
                      color: 'white',
                      minWidth: 0,
                    }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0 }}
                    primary={menuItem.name}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          height: 'calc(100vh - 64px)',
          marginTop: '64px',
          padding: '16px',
          width: '100%',
        }}
        component="main"
      >
        <Outlet />
      </Box>
    </Box>
  );
};
