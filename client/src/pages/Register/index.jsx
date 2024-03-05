import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import encryptPayload from '@utils/encryption';

import signUpImage from '../../../public/sign-up.svg';

import { setUserRegister } from './actions';

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

const Register = () => {
  const navigate = useNavigate();   
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    dispatch(setUserRegister({ 
      email: encryptPayload(data.email), 
      username: encryptPayload(data.username), 
      password: encryptPayload(data.password), 
      role: encryptPayload('Customer')
    }, () => {
      navigate('/login');
    }));
  };

  return (
    <Box className={classes.container}>
        <Card className={classes.cardContainer}>
            <Box className={classes.formContainer}>
                <Typography variant='p' component='div' sx={{ fontSize: '30px', fontWeight: 'bolder', marginBottom: '2%' }}>
                    Register
                </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TextField 
                          {...register('email')}
                          aria-invalid={errors.email ? "true" : "false"}
                          placeholder='Enter email'
                          error={errors.email} 
                          autoComplete={false}
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
                      <TextField 
                          {...register('username')}
                          aria-invalid={errors.username ? "true" : "false"}
                          placeholder='Enter username' 
                          autoComplete={false}
                          focused={false}
                          className={classes.inputText}
                          sx={{ 
                            marginTop: '5%', 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',   
                              },  
                          }}
                      />
                      { errors.username  && 
                          <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                              {errors.username?.message}
                          </Typography>
                      }
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
                      { errors.confirmPassword  && 
                          <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                              {errors.confirmPassword?.message}
                          </Typography>
                      }
                      <Button type='submit' variant='contained' sx={{ marginTop: '5%', borderRadius: '20px' }} className={classes.registerButton}>Register</Button>
                    </Box>
                  </form>
            </Box>
            <Box className={classes.contentRight}>
                <Box
                    component="img"
                    alt="Register Icon"
                    className={classes.img}
                    src={signUpImage}
                />
                <Typography variant='p' component='div' sx={{ fontSize: '20px'}}>
                        You already have an accout? <Link sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 'bolder' }} onClick={() => navigate('/login')}>Login</Link>
                </Typography>
            </Box>
        </Card>
    </Box>
  )
}

export default Register