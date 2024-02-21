import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { showPopup } from '@containers/App/actions';
import { setUserRegister } from './actions';

import classes from './style.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(email === "" && username === "" && password === "") {
      dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_required'})));
    } else if (email === "") {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_email_required'})));
    } else if (username === "") {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_username_required'})));
    } else if(!isValidEmail(email)) {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_email_pattern'})));
    }  else if (password === "") {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_password_required'})));
    } else if(password.length < 6) {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_password_min'})));
    } else if (password !== confirmPassword ) {
        dispatch(showPopup(intl.formatMessage({ id: 'register_validation'}), intl.formatMessage({ id: 'register_validation_Confirmpassword_notsame'})));
    } else {
        dispatch(setUserRegister({ email: email, username: username, password: password, role: 'customer' }, () => {
          navigate('/login');
        }));
    }
  };

  return (
    <Box className={classes.container}>
      <Card component={Box} className={classes.cardContainer}>
          <CardContent>
              <Typography variant="h1" component="div" className={classes.pageTitle} >
                  <FormattedMessage id="register_title" />
              </Typography>
              <FormControl className={classes.formContainer}>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                          <FormattedMessage id="register_label_email" />
                      </FormLabel>
                      <TextField className={classes.input} variant="outlined" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                  </Box>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                          <FormattedMessage id="register_label_username" />
                      </FormLabel>
                      <TextField className={classes.input} variant="outlined" type='text' value={username} onChange={(e) => setUsername(e.target.value)} required={true}/>
                  </Box>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                          <FormattedMessage id="register_label_password" />
                      </FormLabel>
                      <TextField className={classes.input} variant="outlined" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                  </Box>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                          <FormattedMessage id="register_label_confirmPassword" />
                      </FormLabel>
                      <TextField className={classes.input} variant="outlined" type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required={true}/>
                  </Box>
              </FormControl>
              <Button className={classes.registerButton} onClick={onSubmit}><FormattedMessage id="register_title" /></Button>
          </CardContent>  
      </Card>
    </Box>
  )
}

export default Register