import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import CardItem from '@components/Card';

import { getWishlistData } from './actions';
import { selectWishlist } from './selectors';

import classes from './style.module.scss';

const Wishlist = (wishlistData) => {
  const dispatch = useDispatch();

  const wishlistDatatest = wishlistData?.wishlistData;

  useEffect(() => {
    dispatch(getWishlistData());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
       <Typography variant='h1' component='div' className={classes.pageTitle}>
          <FormattedMessage id="wishlist_title" />
      </Typography>
      <Box className={classes.cardContainer}>
        {wishlistDatatest?.map((wishlist, index) => (
          <CardItem key={index} itemData={wishlist.item}/>
        ))}
      </Box>
    </Box>
  )
}

Wishlist.propTypes = {
  wishlistData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  wishlistData: selectWishlist,
});

export default connect(mapStateToProps)(Wishlist);