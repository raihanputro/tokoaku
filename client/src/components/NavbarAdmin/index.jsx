import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { setLogin, setToken, setUser } from '@containers/Client/actions';
import { setLocale, setTheme } from '@containers/App/actions';

import classes from './style.module.scss';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const NavbarAdmin = ({ title, locale, theme, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [menuPosition, setMenuPosition] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openLang = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open} className={classes.appBar}>
          <Toolbar sx={{   pr: '24px',  }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box className={classes.toolbar}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  />
              </IconButton>
            </Tooltip>
              <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
                {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
              </div>
              <div className={classes.toggle} onClick={handleClick}>
                <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                <div className={classes.lang}>{locale}</div>
                <ExpandMoreIcon />
              </div>
            </Box>
           <Menu open={openLang} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => {handleCloseUserMenu, navigate('/profile')}}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem 
              onClick={
                () => { 
                  handleCloseUserMenu, 
                  dispatch(setLogin(false)), 
                  dispatch(setToken(null)),
                  dispatch(setUser({})),
                  navigate('/')
                }
              }>
                <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Box className={classes.drawer}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <List component="nav" sx={{ mt: 4 }} className={classes.listContainer}>
              <ListItemButton onClick={() => navigate('/admin/user-data')}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <FormattedMessage id="drawer_user_data" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/admin/item-data')}>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <FormattedMessage id="drawer_item_data" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/admin/category-data')}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <FormattedMessage id="drawer_category_data" />
              </ListItemButton>
            </List> 
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}> 
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
  )
}

NavbarAdmin.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // isLogin: selectLogin,
  // cartDataSelect: selectCart
})

export default connect(mapStateToProps)(NavbarAdmin);