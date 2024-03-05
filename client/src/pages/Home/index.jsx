import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';

import { getItemList } from './actions';
import { selectItem } from './selectors';

import Slider from '@components/Carousel';
import CategoryMenu from '@components/CategoryMenu';
import CardItem from '@components/Card';

import classes from './style.module.scss';

const Home = (items) => {
  const dispatch = useDispatch();
  const itemsData = items?.items;

  useEffect(() => {
    dispatch(getItemList());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Slider />
      <CategoryMenu />
      <Box className={classes.cardContainer}>
        {itemsData?.map((item, index) => (
          <CardItem key={index}  itemData={item}/>
        ))}
      </Box>
    </Box>
  );
};

Home.propTypes = {
  items: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  items: selectItem,
});

export default connect(mapStateToProps)(Home);
