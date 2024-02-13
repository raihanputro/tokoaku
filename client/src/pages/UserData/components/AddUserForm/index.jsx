import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';

import { setUserRegister } from '@pages/Register/actions';

import classes from './style.module.scss';

const AddUserForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const { handleSubmit, control, reset } = useForm();

    const onSubmit = (data) => {
        dispatch(setUserRegister({email: data.email, password: data.password, username: data.username, address: data.address, phone: data.phone, role: data.role }, () => {
          reset();
          onClose();
        }));
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="add_user_modal_title" />
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
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
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
                defaultValue=""
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='password'
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
                defaultValue=""
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
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
                defaultValue=""
                rules={{ required: 'Adrress is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
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
                defaultValue=""
                rules={{ required: 'Phone is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
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
                defaultValue=""
                rules={{ required: 'Role is required' }}
                render={({ field }) => (
                  <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Role"
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

export default AddUserForm