import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { setUserRegister } from '@pages/Register/actions';

import encryptPayload from '@utils/encryption';

import { getuserData } from '../../actions';

import classes from './style.module.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is a required field"),
  username: yup
    .string()
    .required("username is required!")
    .matches(/^(\S+$)/, 'Cant contain blackspace')
    .matches(/[a-zA-Z]/, 'Must contain alphabet')
    .matches(/\d/, 'Must contain number'),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be longer than 6 characters!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

const AddUserForm = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const { register, handleSubmit, reset,  formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
      dispatch(setUserRegister({ 
        email: encryptPayload(data.email), 
        username: encryptPayload(data.username), 
        password: encryptPayload(data.password), 
        role: encryptPayload('Admin')
      }, () => {
        onClose();
        dispatch(getuserData());
        reset();
      }));
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bolder' }}>
          Add Admin
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Email
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                  {...register('email')}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder='Enter Email'
                  error={errors.email && true} 
                  fullWidth
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                        },
                  }}
                />
                { errors.email && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.email?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Username
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <TextField
                  {...register('username')}
                  aria-invalid={errors.username ? "true" : "false"}
                  placeholder='Enter desc'
                  error={errors.username && true} 
                  fullWidth
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                        },
                  }}
                />
                { errors.username && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.username?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Password
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <TextField 
                  {...register("password")}
                  aria-invalid={errors.password ? "true" : "false"}
                  error={errors.password && true} 
                  placeholder='Enter password' 
                  type={showPassword ? 'text': 'password'}
                  InputProps={{ 
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      marginTop: '5%', 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',   
                        },
                  }}
                  />
                { errors.password && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.password?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Confirm Password
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
              <TextField 
                        {...register("confirmPassword")}
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        error={errors.confirmPassword && true} 
                        placeholder='Enter confirmation password' 
                        type={showConfirmPassword ? 'text': 'password'}                        
                        autoComplete={false}
                        focused={false} 
                        InputProps={{ 
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton onClick={handleShowConfirmPassword}>
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        className={classes.inputText}
                        sx={{ 
                            marginTop: '5%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                              },
                        }}
                      />
                { errors.password && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.password?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className={classes.addButton}
            >
                Add Admin
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  )
}

export default AddUserForm