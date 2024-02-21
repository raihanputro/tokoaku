import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { selectUserDataDetail } from '../../selectors';
import { getUserDataDetail } from '../../actions';

import classes from './style.module.scss';

const DetailUser = ({isOpen, onClose, id, userDataSelect}) => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(isOpen === true && id) {
          dispatch(getUserDataDetail(id), () => {});
        }
    }, [id]);

      useEffect(() => {
        setUserData(userDataSelect?.result)
      }, [userDataSelect]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="detail_user_modal_title" />
        </Typography>
        <form>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="email_modal_input" />
              </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    disabled
                    value={userData?.email}
                  />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="username_modal_input" />
              </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    disabled
                    value={userData?.username}
                  />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="address_modal_input" />
              </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    disabled
                    value={userData?.address}
                  />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="phone_modal_input" />
              </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    disabled
                    value={userData?.phone}
                  />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="role_modal_input" />
              </Typography>
              <TextField
                    fullWidth
                    margin="normal"
                    disabled
                    value={userData?.role}
                />
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => onClose()}
            >
                <FormattedMessage id="detail_user_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

DetailUser.propTypes = {
    userDataSelect: PropTypes.object,
  };
  
  const mapStateToProps = createStructuredSelector({
    userDataSelect: selectUserDataDetail,
  });
  
  export default connect(mapStateToProps)(DetailUser);