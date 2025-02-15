import React, { useState, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logoville from '../assets/images/logoville.jpeg';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = !user
    ? [
        { text: 'Login', to: '/login', icon: <LoginIcon /> },
        { text: 'Register', to: '/register', icon: <HowToRegIcon /> },
        { text: 'Accueil', to: '/', icon: <HomeIcon /> },
      ]
    : [
        { text: 'Dashboard', to: `/${user.role}-dashboard`, icon: <DashboardIcon /> },
        { text: 'Profil', to: '/profile', icon: <AccountCircleIcon /> },
        { text: 'Logoff', to: '/login', icon: <LogoutIcon />, action: handleLogout },
      ];

  return (
    <>
      {/* Barre des réseaux sociaux */}


      <Box
  sx={{
    backgroundColor: '#F9F9F9', // Fond clair
    display: 'flex',
    justifyContent: 'center', // Centre le contenu horizontalement
    alignItems: 'center', // Centre verticalement
    px: 2,
    py: 1,
    position: 'fixed',
    top: 0, // Aligner au haut de la page
    left: 0, // S'assurer qu'il commence à gauche
    width: '100%', // S'étend sur toute la largeur de l'écran
    zIndex: 1200,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Ombre douce
  }}
>
  {/* Icône Facebook */}
  <IconButton
    href="https://facebook.com"
    target="_blank"
    sx={{
      backgroundColor: '#4267B2', // Couleur de fond pour le cercle
      color: '#fff', // Couleur de l'icône
      mx: 1,
      width: { xs: '40px', sm: '50px' }, // Largeur du cercle responsive
      height: { xs: '40px', sm: '50px' }, // Hauteur du cercle responsive
      borderRadius: '50%', // Cercle parfait
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.2)', // Agrandir au survol
        boxShadow: '0px 4px 15px rgba(66, 103, 178, 0.5)', // Ombre animée au survol
      },
      fontSize: { xs: '20px', sm: '28px' }, // Taille de l'icône responsive
    }}
  >
    <FacebookIcon sx={{ fontSize: 'inherit' }} />
  </IconButton>

  {/* Icône Twitter */}
  <IconButton
    href="https://twitter.com"
    target="_blank"
    sx={{
      backgroundColor: '#1DA1F2',
      color: '#fff',
      mx: 1,
      width: { xs: '40px', sm: '50px' },
      height: { xs: '40px', sm: '50px' },
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.2)',
        boxShadow: '0px 4px 15px rgba(29, 161, 242, 0.5)',
      },
      fontSize: { xs: '20px', sm: '28px' },
    }}
  >
    <TwitterIcon sx={{ fontSize: 'inherit' }} />
  </IconButton>

  {/* Icône Instagram */}
  <IconButton
    href="https://instagram.com"
    target="_blank"
    sx={{
      backgroundColor: '#C13584',
      color: '#fff',
      mx: 1,
      width: { xs: '40px', sm: '50px' },
      height: { xs: '40px', sm: '50px' },
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.2)',
        boxShadow: '0px 4px 15px rgba(193, 53, 132, 0.5)',
      },
      fontSize: { xs: '20px', sm: '28px' },
    }}
  >
    <InstagramIcon sx={{ fontSize: 'inherit' }} />
  </IconButton>

  {/* Icône LinkedIn */}
  <IconButton
    href="https://linkedin.com"
    target="_blank"
    sx={{
      backgroundColor: '#0077B5',
      color: '#fff',
      mx: 1,
      width: { xs: '40px', sm: '50px' },
      height: { xs: '40px', sm: '50px' },
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.2)',
        boxShadow: '0px 4px 15px rgba(0, 119, 181, 0.5)',
      },
      fontSize: { xs: '20px', sm: '28px' },
    }}
  >
    <LinkedInIcon sx={{ fontSize: 'inherit' }} />
  </IconButton>
</Box>





      {/* Barre de navigation */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#008751',
          height: '110px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1100,
          px: 2,
          top: '48px', // Décalage pour ne pas chevaucher la barre des réseaux sociaux
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt:2 }}>
  <img
    src={logoville}
    alt="Logo de la ville"
    style={{
      height: '80px',
      width: '80px',
      borderRadius: '50%',
      
    }}
  />
  <Typography
    variant="h6"
    sx={{
      fontWeight: 'bold',
      fontFamily: "'Roboto', sans-serif",
      color: 'white',
    }}
  >
  DJANGAL
  </Typography>
</Box>


          {/* Menu Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              mt:2,
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.to}
                startIcon={item.icon}
                onClick={item.action || null}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontFamily: "'Roboto', sans-serif",
                  color: 'white',
                  fontSize: '18px',
                  transition: 'transform 0.3s ease, color 0.3s ease',
                  '&:hover': {
                    color: '#FF9B00',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Menu Hamburger pour mobile */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (menu latéral pour mobile) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#f9f9f9', // Fond clair pour le Drawer
            color: '#333', // Couleur des textes
            height: '100%', // Prend toute la hauteur
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Liens de navigation */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={item.action ? 'button' : Link}
                to={item.to}
                onClick={item.action || null}
                sx={{
                  color: '#333', // Couleur des textes dans le menu
                  '&:hover': {
                    backgroundColor: '#FF9B00',
                    color: 'white',
                  },
                }}
              >
                {item.icon && <Box sx={{ marginRight: 2 }}>{item.icon}</Box>}
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
