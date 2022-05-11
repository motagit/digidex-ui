import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let navigation = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };
  
  const routeChange = (path) => {
    navigation(path);
  }
  let location  = useLocation();

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  position="static" open={open}>
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
          {[{text: 'Insert Digimon', link: '/insertDigimon/'}, {text: 'Manage', link: ''}].map((object, index) => (
            <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={toggleDrawer('left', false)} to={object.link} >
              <ListItem button key={object.text}>
                <ListItemIcon >
                  {index % 2 === 0 ? <AddCircleIcon /> : <ManageAccountsIcon />}
                </ListItemIcon>
                <ListItemText primary={object.text} />
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider />

        <List>
          {['About'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <ListItem button>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
    </Drawer>
    </Box>
  );
}

export default Navbar;