import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Avatar, Menu, MenuItem, Box, Button, Tooltip, IconButton, Typography } from '@mui/material'; 
import Badge from '@mui/material/Badge';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CommentIcon from '@mui/icons-material/Comment';

import { setLocale, setTheme } from '@containers/App/actions';
import { selectLogin } from '@containers/Client/selectors';
import { setLogin, setToken, setUser } from '@containers/Client/actions';
import { setDataCart } from '@pages/Cart/actions';
import { selectCart } from '@pages/Cart/selectors';
import { selectItem } from '@pages/Home/selectors';
import { selectProfile } from '@pages/Profile/selectors';
import { setTransactionData } from '@pages/Checkout/actions';

import classes from './style.module.scss';

const Navbar = ({ title, locale, theme, isLogin, cartDataSelect, items, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [openSug, setOpenSug] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const open = Boolean(menuPosition);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const [cartData, setCartData] = useState([]);
  const [qty, setQty] = useState(0);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  useEffect(() => {
    setCartData(cartDataSelect);
  }, [cartDataSelect]);

  useEffect(() => {
    const totalQuantities = cartData && Array.isArray(cartData) ? cartData.reduce((accumulator, currentValue) => accumulator + currentValue.qty, 0) : 0;
    setQty(totalQuantities);
  }, [cartData]);
  

  const sideNavbar = (
    <Box sx={{ flexGrow: 0, marginRight: '0.5rem'  }} className={classes.buttonContainer}>
      <Button variant="contained" className={classes.buttonRegister} onClick={() => navigate('/register')}><FormattedMessage id="register_title" /></Button>
      <Button variant="contained" className={classes.buttonLogin} onClick={() => navigate('/login')}><FormattedMessage id="login_title" /></Button>
    </Box>
  );

  const sideNavbarLogin = (
    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', gap: '30px' }}>
      <Tooltip title="Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        {profile.photo !== null ? (
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                height: "50px",
                width: "50px",
                borderRadius: "50%"
              }}
              src={profile?.photo}
            />
          ) : (
            <Avatar sx={{ height: "50px", width: "50px" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ 
          marginTop: '60px',
          '& .MuiPaper-root': {
            backgroundColor: theme === 'light' ? '#fff' : '#4f4557',
          },
        }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',  
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom', 
          horizontal: 'center', 
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
          <MenuItem onClick={() => {handleCloseUserMenu, navigate('/profile')}}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
              <AccountBoxIcon sx={{ color: 'blue' }} />
              <Typography textAlign="center">Profile</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => {handleCloseUserMenu, navigate('/wishlist')}}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
              <FavoriteIcon sx={{ color: '#FF407D' }} />
              <Typography textAlign="center">Wishlist</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={() => {handleCloseUserMenu, navigate('/order')}}>
            <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
              <ShoppingBagIcon sx={{ color: '#78A083' }} />
              <Typography textAlign="center">Order</Typography>
            </Box>
          </MenuItem> 
          <MenuItem 
            onClick={
              () => { 
                handleCloseUserMenu, 
                dispatch(setLogin(false)), 
                dispatch(setToken(null)),
                dispatch(setUser({})),
                dispatch(setDataCart({})),
                dispatch(setTransactionData({})),
                navigate('/')
              }
            }>
              <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <LogoutIcon sx={{ color: 'red' }} />
                <Typography textAlign="center">Logout</Typography>
              </Box>
          </MenuItem>
      </Menu>
    </Box>
  );

  const handleInputChange = (e, value, reason) => {
    setInputValue(value);

    if (!value) {
      setOpenSug(false);
    }
  };

  const handleItemSelect = (event, value) => {
    navigate(`/search?item=${value}&category=`); // Redirect to item detail page
    setOpenSug(false);
  };

  
  return (
    <div className={classes.headerWrapper} data-testid="navbar">
    <div className={classes.contentWrapper}>
      <Box sx={{ display: 'flex', gap: '3%', width: '100%'}}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
          <Autocomplete
            open={openSug}
            onOpen={() => {
               if (inputValue) {
                 setOpenSug(true);
               }
            }}
            onClose={() => setOpenSug(false)}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={items.map((item) => item.name)}
            onChange={handleItemSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.searchBar}
                InputLabelProps={{shrink: false}}
                placeholder='Cari Barang'
                sx={{ 
                  width: '100%', 
                  minWidth: '500px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    '& fieldset': {
                      borderColor: theme === 'light' ? '#e8eef1' : '#1F2544',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: theme === 'light' ? '#e8eef1' : '#1F2544',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme === 'light' ? '#e8eef1' : '#1F2544',
                    },
                  },
                  '& .MuiInputBase-input': {
                    borderRadius: '20px',
                    borderColor: theme === 'light' ? '#e8eef1' : '#1F2544',
                    '&:focus': {
                      borderColor: theme === 'light' ? '#e8eef1' : '#1F2544',
                    },
                  }
                }}
              />
            )}
      />
      </Box>
      <div className={classes.toolbar}>
        <IconButton onClick={() => navigate('/cart')}>
          <Badge badgeContent={qty} color="error" showZero>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        { isLogin ? sideNavbarLogin : sideNavbar}
        {/* <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
          {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
        </div> */}
        {/* <div className={classes.toggle} onClick={handleClick}>
          <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
          <div className={classes.lang}>{locale}</div>
          <ExpandMoreIcon />
        </div> */}
      </div>
      {/* <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
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
      </Menu> */}
    </div>
  </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  isLogin: PropTypes.bool,
  cartDataSelect: PropTypes.any,
  items: PropTypes.any,
  profile: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
  cartDataSelect: selectCart,
  items: selectItem,
  profile: selectProfile
})

export default connect(mapStateToProps)(Navbar);
