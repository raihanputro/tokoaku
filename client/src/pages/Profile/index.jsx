import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import { getUserProfile } from './actions';
import { selectProfile } from './selectors';

import classes from './style.module.scss';

const Profile = ({profile}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Card sx={{ minWidth: 300, minHeight: 400}} className={classes.cardContainer}>
        <Avatar alt={profile?.username?.toUpperCase()} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
        <Typography variant='h6' component='div' className={classes.username}>
            {profile?.username}
        </Typography>
        <Box className={classes.profileContainer}>
          <Box className={classes.profileUser}>
            <Typography variant='h6' component='div' className={classes.label}>
              <FormattedMessage id="profile_email_label" />
            </Typography>
            <Typography variant='h6' component='div' className={classes.bio}>
              {profile?.email}
            </Typography>
          </Box>
          <Box className={classes.profileUser}>
            <Typography variant='h6' component='div' className={classes.label}>
              <FormattedMessage id="profile_address_label" />
            </Typography>
            <Typography variant='h6' component='div' className={classes.bio}>
              {profile?.address}
            </Typography>
          </Box>
          <Box className={classes.profileUser}>
            <Typography variant='h6' component='div' className={classes.label}>
              <FormattedMessage id="profile_phone_label" />
            </Typography>
            <Typography variant='h6' component='div' className={classes.bio}>
              {profile?.phone}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  )
};

Profile.propTypes = {
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
})

export default connect(mapStateToProps)(Profile);