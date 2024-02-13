import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import sliderLight from '../../../public/slider-light.svg';
import sliderDark from '../../../public/slider-dark.svg';

import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const Slider = ({theme}) => {

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',  
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: theme === 'light' ? `url(${sliderLight})` : `url(${sliderDark})`,
      }}
  >
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,   
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      }}
    />
    <Grid container>
      <Grid item md={6}>
        <Box
          sx={{
            position: 'relative',
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
          }}
          
          className={classes.sliderTextContainer}
        >
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            <FormattedMessage id="slider_title" />
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            <FormattedMessage id="slider_desc" />
          </Typography>
          <Button className={classes.sliderButton}>
            <FormattedMessage id="slider_button" />
          </Button>
        </Box>
      </Grid>
    </Grid>
    </Paper>
  )
}

Slider.propTypes = {
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme
})

export default connect(mapStateToProps)(Slider);