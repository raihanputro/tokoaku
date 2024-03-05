import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from 'react-hot-toast';


import encryptPayload from '@utils/encryption';

import signUpImage from '../../../public/sign-in.svg';

import { selectUser } from '@containers/Client/selectors';
import { setUserLogin } from './actions';

import classes from './style.module.scss';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be longer than 6 characters!"),
});

const Login = ({ userSelect }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (userSelect) {
      if (userSelect.role === 'Customer') {
        navigate('/');
      } else if (userSelect.role === 'Admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [userSelect]); 

  const onSubmit = (data) => {
    dispatch(setUserLogin({ 
      email: encryptPayload(data.email), 
      password: encryptPayload(data.password), 
    }, (err) => {
      toast(err, {
        style: {
          marginTop: '2%',
        }
      });
    }));
  };

  return (
    <Box className={classes.container}>
        <Card className={classes.cardContainer}>
            <Box className={classes.contentRight}>
                <Box
                    className={classes.img}
                    component="img"
                    alt="Register Icon"
                    src={signUpImage}
                />
                <Typography variant='p' component='div' sx={{ fontSize: '20px'}}>
                        You dont have an accout? <Link sx={{ textDecoration: 'none', cursor: 'pointer', fontWeight: 'bolder' }} onClick={() => navigate('/register')}>Register</Link>
                </Typography>
            </Box>
            <Box className={classes.formContainer}>
                <Typography variant='p' component='div' sx={{ fontSize: '30px', fontWeight: 'bolder', marginBottom: '2%' }}>
                    Login
                </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TextField 
                          {...register('email')}
                          aria-invalid={errors.email ? "true" : "false"}
                          placeholder='Enter email'
                          error={errors.email && true} 
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
                          {...register("password")}
                          aria-invalid={errors.password ? "true" : "false"}
                          error={errors.email && true} 
                          placeholder='Enter password' 
                          type={showPassword ? 'text': 'password'}
                          focused={false}
                          className={classes.inputText}
                          InputProps={{ 
                            endAdornment: (
                              <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword}>
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
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
                      <Button type='submit' variant='contained' sx={{ marginTop: '5%', borderRadius: '20px' }} className={classes.registerButton}>Login</Button>
                    </Box>
                  </form>
            </Box>
        </Card>
        <Toaster />
    </Box>
  )
}

Login.propTypes = {
  userSelect: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userSelect: selectUser,
})

  export default connect(mapStateToProps)(Login);