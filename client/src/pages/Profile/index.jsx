import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import MyProfile from './components/MyProfile';
import ChangePassword from './components/ChangePassword';

import { setStepProfile } from './actions';
import { selectStep } from './selectors';
import { getUserProfile } from './actions';
import { selectProfile } from './selectors';

import classes from './style.module.scss';

const Profile = ({ step, profile }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleStep = (e) => {
    dispatch(setStepProfile(e.target.value));
  };

  const renderComponent = () => {
    switch (step) {
      case '1': 
        return <MyProfile />;
      case '2':
        return <ChangePassword />
    }
  } 

  return (
    <Box className={classes.container}>
      <Card className={classes.cardContainer}>
        <Card className={classes.leftNavigation}>
          {profile.photo !== null ? (
            <Box
              component="img"
              sx={{
                objectFit: "contain",
                height: "150px",
                width: "150px",
                borderRadius: "50%"
              }}
              src={profile?.photo}
            />
          ) : (
            <Avatar sx={{ height: "150px", width: "150px" }} />
          )}
          <Button className={classes.stepButton} value={'1'} onClick={handleStep}>My Profile</Button>
          <Button className={classes.stepButton} value={'2'} onClick={handleStep}>Change Password</Button>
        </Card>
        <Box>
          {renderComponent()} 
       </Box>
      </Card>
    </Box>
  )
};

Profile.propTypes = {
  step: PropTypes.string,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  profile: selectProfile,
});

export default connect(mapStateToProps)(Profile);