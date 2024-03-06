  import React, { useState, useEffect, useRef } from 'react';
  import PropTypes from 'prop-types';
  import { useNavigate } from 'react-router-dom';
  import { createStructuredSelector } from 'reselect';
  import { useDispatch, connect } from 'react-redux';
  import { FormattedMessage } from 'react-intl';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import TextField from '@mui/material/TextField';
  import MenuItem from '@mui/material/MenuItem';
  import Button from '@mui/material/Button';
  import { useForm } from 'react-hook-form';
  import toast, { Toaster } from 'react-hot-toast';
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";

  import encryptPayload from '@utils/encryption';

  import { updateUserProfile } from '@pages/Profile/actions';
  import { getUserProfile } from '@pages/Profile/actions';
  import { selectProfile } from '@pages/Profile/selectors';
  import { getProvinceData, getCityData } from '@pages/Checkout/actions';
  import { selectProvince, selectCity } from '@pages/Checkout/selectors';

  import classes from './style.module.scss';

  const MyProfile = ({ profile, province, city }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photoRef = useRef();

    const [photo, setPhoto] = useState(null);

    const [locData, setLocData] = useState({
      province_id: '0',
      city_id: '0',
    });
    
    const {
      handleSubmit, 
      register,
      setValue,
      formState: { errors }
    } = useForm();

    useEffect(() => {
      dispatch(getUserProfile());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getProvinceData());
    }, [dispatch]);
    
    useEffect(() => {
      if (profile?.province_id) {
        dispatch(getCityData(profile?.province_id));
      }
    }, [dispatch, profile?.province_id]);

    useEffect(() => {
      if (profile?.province_id || profile?.city_id) {
        setLocData(prevState => ({
          ...prevState,
          province_id: profile?.province_id,
          city_id: profile?.city_id
        }))
      }
    }, [profile]);

    const handleProvince = async (province_id) => {
      setLocData(prevState => ({
        ...prevState,
        province_id: province_id,
        city_id: ''
      }));
      dispatch(getCityData(province_id));
    };

    const handleCity= async (city_id) => {
      setLocData(prevState => ({
        ...prevState,
        city_id: city_id
      }));
    };

    const handlePhoto= (e) => {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
    };

    useEffect(() => {
      if (profile) {
        setValue('email', profile?.email);
        setValue('username', profile?.username);
        setValue('fullName', profile?.fullName);
        setValue('address', profile?.address);
        setValue('phone', profile?.phone);
      }
    }, [profile]);

    const onSubmit = (data) => {
      dispatch(updateUserProfile({
        username: data.username,
        fullName: data.fullName,
        address: data.address,
        province_id: locData.province_id,
        city_id: locData.city_id,
        phone: data.phone,
        photo: photo
      }, () => {
        toast('Update profile Successfully', {
          style: {
            marginTop: '2%',
          }
        });
        setPhoto(null);
        dispatch(getUserProfile());
        navigate(0);
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
            My Profile
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.formInputContainer}>
            <Box className={classes.inputContainer}>
              <Typography className={classes.inputLabel} variant='body' component='div'>
                Email
              </Typography>
              <TextField 
                {...register('email')}
                disabled={true}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />  
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Username
              </Typography>
              <TextField 
                {...register('username')}
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Full Name
              </Typography>
              <TextField 
                {...register('fullName')}
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Address
              </Typography>
              <TextField 
                {...register('address')}
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Province
              </Typography>
              <TextField 
                select
                {...register('province_id')}
                value={locData.province_id}
                onChange={(e) => {
                  handleProvince(e.target.value);
                }}
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              >
                <MenuItem value={'0'}><FormattedMessage id="selectProvince_checkout" /></MenuItem>
                {province && Array.isArray(province) && province?.map((province) => (
                    <MenuItem key={province?.province_id} value={province?.province_id}>
                      {province?.province}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                City
              </Typography>
              <TextField 
                select={true}
                {...register('city_id')}
                value={locData.city_id}
                onChange={(e) => {
                  handleCity(e.target.value);
                }}
                focused={false}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              >
                <MenuItem value={'0'}><FormattedMessage id="selectCity_checkout" /></MenuItem>
                {city && Array.isArray(city) && city?.map((city) => (
                  <MenuItem key={city?.city_id} value={city?.city_id}>
                    {city?.city_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Phone
              </Typography>
              <TextField 
                {...register('phone')}
                focused={false}
                placeholder='Enter phone'
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <Typography variant='body' component='div' className={classes.inputLabel}>
                Photo
              </Typography>
              <TextField 
                type='file'
                accept='image/png, image/jpg, image/jpeg'
                focused={false}
                ref={photoRef}
                placeholder='Enter phone'
                onChange={handlePhoto}
                className={classes.inputText}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                    },
                }}
              />
            </Box>
            <Button type='submit' variant='contained' sx={{ marginTop: '1%', borderRadius: '20px' }} className={classes.updateButton}>Perbarui</Button>
          </Box>
        </form>
        <Toaster />
      </Box>
    )
  };

  MyProfile.propTypes = {
    profile: PropTypes.object,
    province: PropTypes.array,
    city: PropTypes.array
  };

  const mapStateToProps = createStructuredSelector({
    profile: selectProfile,
    province: selectProvince,
    city: selectCity  
  });

  export default connect(mapStateToProps)(MyProfile);