import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import classes from './style.module.scss';

const Wishlist = () => {
  return (
    <Box className={classes.container}>
       <Typography variant='h1' component='div' className={classes.pageTitle}>
          <FormattedMessage id="wishlist_title" />
      </Typography>
    </Box>
  )
}

export default Wishlist