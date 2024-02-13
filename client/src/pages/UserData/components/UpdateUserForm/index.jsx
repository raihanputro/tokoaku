import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { selectUserDataDetail } from '@pages/UserData/selectors';
import { getUserDataDetail, updateUserData } from '@pages/UserData/actions';

import classes from './style.module.scss';

const UpdateUserForm = ({isOpen, onClose, id, userDataSelect}) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue } = useForm();

  useEffect(() => {
    if(isOpen === true && id) {
      dispatch(getUserDataDetail(id), () => {});
    }
  }, [id]);

  useEffect(() => {
    if (isOpen && userDataSelect?.result) {
      setValue('email', userDataSelect?.result?.email);
      setValue('password', userDataSelect?.result?.password);
      setValue('username', userDataSelect?.result?.username);
      setValue('address', userDataSelect?.result?.address);
      setValue('phone', userDataSelect?.result?.phone);
      setValue('role', userDataSelect?.result?.role);
    }
  }, [isOpen, userDataSelect]);

  const onSubmit = (data) => {
    const updatedData = {
      email: data.email || userDataSelect?.result?.email, 
      password: data.password || userDataSelect?.result?.password, 
      username: data.username || userDataSelect?.result?.username, 
      address: data.address || userDataSelect?.result?.address, 
      phone: data.phone || userDataSelect?.result?.phone,   
      role: data.role || userDataSelect?.result?.role,
    };
    dispatch(updateUserData(id, updatedData));
    reset();
    onClose();
  };


  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="update_user_modal_title" />
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="email_modal_input" />
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}                   
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="password_modal_input" />
              </Typography>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='password'
                    value={field.value}                   
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="username_modal_input" />
              </Typography>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}                   
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="address_modal_input" />
              </Typography>
              <Controller
                name="address"
                control={control}
                rules={{ required: 'Adrress is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}                   
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="phone_modal_input" />
              </Typography>
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}                   
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="role_modal_input" />
              </Typography>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field.value}                   
                  fullWidth
                >
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'customer'}>Customer</MenuItem>
                </Select>
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
                <FormattedMessage id="add_user_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

UpdateUserForm.propTypes = {
  userDataSelect: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userDataSelect: selectUserDataDetail,
});

export default connect(mapStateToProps)(UpdateUserForm);