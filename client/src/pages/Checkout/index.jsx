import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AddressForm from './components/Address Form';
import Review from './components/Review';

import classes from './style.module.scss';
import { selectStep } from './selectors';
import { setStepCheckout } from './actions';

const steps = [<FormattedMessage id="shipping_address" />, <FormattedMessage id="review_your_order" />];

const Checkout = (step) => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    dispatch(setStepCheckout(step.step + 1));
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    dispatch(setStepCheckout(step.step - 1));
    setActiveStep(activeStep - 1);
  };

  const renderComponent = () => {
    switch (step.step) {
      case 0: 
        return <AddressForm onNext={handleNext} />;
      case 1:
        return <Review onNext={handleNext} onBack={handleBack} />
    }
  } 

  return (
    <>
      <Box className={classes.container} >
        <Paper variant="outlined" className={classes.contentContainer} sx={{ borderRadius: '20px', my: { xs: 2, md: 2  }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 'bolder' }}>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderComponent()} 
        </Paper>
      </Box>
    </>
  )
}

Checkout.propTypes = {
  step: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep
});

export default connect(mapStateToProps)(Checkout);