import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

import decode from 'jwt-decode';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/')
    navigate(0);
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };
  
  const routeChange = (path) => {
    navigate(path);
  }
  let location  = useLocation();

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor: '#050077'}} position="static" open={open} s>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={location.pathname.includes("digimon") || location.pathname.includes("Digimon") ? () => routeChange(-1) : toggleDrawer('left',true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            {location.pathname.includes("digimon") || location.pathname.includes("Digimon") ? (
              <ArrowBackIcon />
            ) : (
              <MenuIcon />
            )}
            
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer('left', false)}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            paddingLeft: '10'
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={toggleDrawer('left', false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer('left', false)} to={'/'} >
            <ListItem button>
              <ListItemIcon >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>

          <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://github.com/motagit/digidex-ui" target="_blank" rel="noopener noreferrer">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItem>
          </a>
        </List>

        <Divider />

        {user?.result?.user && (
          <>
            <List>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer('left', false)} to="/insertDigimon/" >
                  <ListItem button>
                    <ListItemIcon >
                      <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Insert Digimon" />
                  </ListItem>
                </Link>

                {user?.result?.role === 5001 && (
                  <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer('left', false)} to="/insertDigimon/" >
                    <ListItem button>
                      <ListItemIcon >
                        <ManageAccountsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Manage Users" />
                    </ListItem>
                  </Link>
                )}
            </List>
            <Divider />
          </>
        )}
        
        {user?.result ? (
          <ListItem button onClick={() => { toggleDrawer('left', false); logout() }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          
        ) : (
          <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer('left', false)} to="/login" >
            <ListItem button >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </Link>
        )}
    </Drawer>
    </Box>
  );
}

export default Navbar;