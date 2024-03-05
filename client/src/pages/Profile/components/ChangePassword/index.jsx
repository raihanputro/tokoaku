import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useDispatch, connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { changePasswordProfile } from '@pages/Profile/actions';

import encryptPayload from '@utils/encryption';

import classes from './style.module.scss';

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old Password is required!")
    .min(6, "Password must be longer than 6 characters!"),
  newPassword: yup
    .string()
    .required("New Password is required!")
    .min(6, "Password must be longer than 6 characters!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("newPassword"), null], "Confirm Password must match!"),
});

const ChangePassword = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit, 
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(changePasswordProfile({
      oldPassword: encryptPayload(data.oldPassword),  
      newPassword: encryptPayload(data.newPassword)
    }, () => {
      toast('Change Password Successfully', {
        style: {
          marginTop: '2%',
        }
      });
      reset();
    }, (err) => {
      toast(err, {
        style: {
          marginTop: '2%',
        }
      });
    }))
  };

  return (
    <Box className={classes.formContainer}>
      <Typography variant='p' component='div' sx={{ fontSize: '30px', fontWeight: 'bolder', marginBottom: '5%' }}>
          Change Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.formInputContainer}>
          <Box className={classes.inputContainer}>
            <Typography variant='body' component='div' className={classes.inputLabel}>
              Old Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField 
                {...register('oldPassword')}
                aria-invalid={errors.oldPassword ? "true" : "false"}
                error={errors.oldPassword} 
                placeholder='Enter Old Password'
                type='password'
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
                />
                { errors.oldPassword && 
                  <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                      {errors.oldPassword?.message}
                  </Typography>
                }
            </Box>
          </Box>
          <Box className={classes.inputContainer}>
            <Typography variant='body' component='div' className={classes.inputLabel}>
              New Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField 
                {...register('newPassword')}
                aria-invalid={errors.newPassword ? "true" : "false"}
                error={errors.newPassword} 
                placeholder='Enter New Password'
                type='password'
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
              { errors.newPassword && 
                <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                    {errors.newPassword?.message}
                </Typography>
              }
            </Box>

          </Box>
          <Box className={classes.inputContainer}>
            <Typography variant='body' component='div' className={classes.inputLabel}>
              Confirm Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField 
                {...register('confirmPassword')}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                error={errors.confirmPassword} 
                placeholder='Enter Confirm Password'
                type='password'
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
              { errors.confirmPassword && 
                <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                    {errors.confirmPassword?.message}
                </Typography>
              }
            </Box>

          </Box>
          <Button type='submit' variant='contained' sx={{ marginTop: '1%', borderRadius: '20px' }} className={classes.updateButton}>Perbarui</Button>
        </Box>
      </form>
      <Toaster />
    </Box>
  )
}

export default ChangePassword