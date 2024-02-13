import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
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
import { selectToken, selectUser } from '@containers/Client/selectors';
import { setUserLogin } from './actions';

import classes from './style.module.scss';

const Login = ({userSelect}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intl = useIntl();

  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  useEffect(() => {
    if (userSelect) {
      if (userSelect.role === 'customer') {
        navigate('/');
      } else if (userSelect.role === 'admin') {
        navigate('/admin');
      }
    }
  }, [userSelect]); 

  const onSubmit = (e) => {
    e.preventDefault();

    if(email === "" && password === "") {
      dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_required'})));
    } else if(email === "") {
      dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_email_required'})));
    } else if(!isEmailValid(email)) {
      dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'register_validation_email_pattern'})));
    } else if(password === "") {
      dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'login_validation_password_required'})));
    } else if(password.length < 6) {
      dispatch(showPopup(intl.formatMessage({ id: 'login_validation'}), intl.formatMessage({ id: 'register_validation_password_min'})));
    } else {
      dispatch(setUserLogin({ email: email, password: password}, () => { 
      }));
    }
};

  return (
    <Box className={classes.container}>
      <Card component={Box} className={classes.cardContainer}>
          <CardContent>
              <Typography variant='h1' component='div' className={classes.pageTitle} >
                <FormattedMessage id="login_title" />
              </Typography>
              <FormControl className={classes.formContainer}>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                        <FormattedMessage id="login_label_email" />
                      </FormLabel>
                      <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='email' value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>
                  </Box>
                  <Box className={classes.inputLabelContainer}>
                      <FormLabel className={classes.label}>
                        <FormattedMessage id="login_label_password" />
                      </FormLabel>
                      <TextField sx={{ input: { color: 'black' } }} className={classes.input} variant="outlined" type='password' value={password} onChange={(e) => setPassword(e.target.value)} required={true}/>
                  </Box>
              </FormControl>
              <Button className={classes.loginButton} onClick={onSubmit}><FormattedMessage id="login_title" /></Button>
              <Typography variant='h1' component='div' className={classes.linkRegister} >
                <FormattedMessage id="login_register_link" />
                <b className={classes.here} onClick={() => navigate('/register')}><FormattedMessage id="login_register_here" /></b>
              </Typography>
          </CardContent>  
      </Card>
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