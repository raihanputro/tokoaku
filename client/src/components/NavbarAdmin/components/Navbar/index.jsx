import React, { useState } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FormattedMessage } from 'react-intl';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const Navbar = ({locale}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [menuPosition, setMenuPosition] = useState(null);

  const openLanguage = Boolean(menuPosition);



  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  return (
    <AppBar position="absolute" open={open}>
    <Toolbar
      sx={{
        pr: '24px', // keep right padding when drawer closed
      }}
    >
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
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        Dashboard
      </Typography>
      <div className={classes.toggle} onClick={handleClick}>
    <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
    <div className={classes.lang}>{locale}</div>
    <ExpandMoreIcon />
  </div>
  <Menu open={openLanguage} anchorEl={menuPosition} onClose={handleClose}>
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
    </Toolbar>
  </AppBar>
  )
}

export default Navbar