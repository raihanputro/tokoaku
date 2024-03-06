import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getUserProfile } from '@pages/Profile/actions';
import { setTransactionData, getProvinceData, getCityData, getShippingCostData } from '@pages/Checkout/actions';
import { selectCity, selectProvince, selectShippingCost, selectTransaction } from '@pages/Checkout/selectors';
import { selectProfile } from '@pages/Profile/selectors';

import classes from './style.module.scss';

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("FullName is a required field"),
  address: yup
    .string()
    .required("Address is required!"),
  phone: yup
    .string()
    .required("Phone is required!"),
  province_id: yup
    .string()
    .test('is-not-select', 'Province is required!', function(value) {
      return value !== '0';
    })
    .required("Province is required!"),
  city_id: yup
    .string()
    .test('is-not-select', 'City is required!', function(value) {
      return value !== '0';
    })
    .required("City is required!"),
  service: yup
    .string()
    .test('is-not-select', 'Service is required!', function(value) {
      return value !== 'select';
    })
    .required("Service is required!"),
  });

const AddressForm = ({ onNext, province, city, shippingCost, profile, transaction,  }) => {
  const dispatch = useDispatch();

  const { handleSubmit, register, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    province_id: '',
    city_id: '',
    service: ''
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!province.length) {
      dispatch(getProvinceData());
    }
  }, [dispatch, province.length]);

  useEffect(() => {
    if (profile || transaction) {
      setFormData({
        fullName:  transaction?.fullName ? transaction?.fullName : profile?.fullName,
        address:  transaction?.address ? transaction?.address : profile?.address,
        phone:  transaction?.phone ? transaction?.phone : profile?.phone,
        province_id: transaction?.province_id ? transaction?.province_id : profile?.province_id,
        city_id: transaction?.city_id ? transaction?.city_id : profile?.city_id,
        service: transaction?.service
      });
    }
  }, [profile, transaction]);

  useEffect(() => {
    if (profile) {
      setValue('fullName', formData?.fullName);
      setValue('address', formData?.address);
      setValue('phone',  formData?.phone);
      setValue('province_id', formData?.province_id);
      setValue('city_id', formData?.city_id);
      setValue('service', formData?.service);
    }
  }, [profile]);

  useEffect(() => {
    if (formData.province_id !== '' && !city.length) {
      dispatch(getCityData(formData.province_id));
    }
  }, [dispatch, formData.province_id, city.length]);


  useEffect(() => {
    if (formData.service && formData.service !== 'cod' && formData.service !== 'select' && formData.city_id !== '0') {
      dispatch(getShippingCostData({ 
        origin: '501', 
        destination: formData.city_id ? formData.city_id : profile?.city_id,
        weight: 500,
        courier: formData.service 
      }));
    };    
  }, [dispatch, formData.service, formData.city_id, profile]);

  const handleProvinceChange = async (provinceId) => {
    setFormData(prevState => ({
      ...prevState,
      province_id: provinceId,
      city_id: '0'
    }));
    dispatch(getCityData(provinceId));
  };

  const handleCityChange = (cityId) => {
    setFormData(prevState => ({
      ...prevState,
      city_id: cityId
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prevState => ({
      ...prevState,
      service: service
    }));
  };

  const onSubmit = (data) => {
    dispatch(setTransactionData({ 
      fullName: data.fullName, 
      address: data.address, 
      phone: data.phone,
      province_id: formData.province_id ? formData.province_id : profile.province_id, 
      city_id: formData.city_id ? formData.city_id : profile.city_id,
      shippingCost: formData.service !== 'cod' ? shippingCost : 0,
      service: formData.service ? formData?.service : transaction?.service
    }));  
    onNext();
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage id="shipping_address" />
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%', marginTop: '3%' }}>
          <Typography variant="body1"  className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="fullName_checkout" />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              {...register('fullName')}
              error={errors.fullName && true} 
              focused={false}
              placeholder="Input Fullname"
              fullWidth
              sx={{ 
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                  },
              }}
            />
            { errors.fullName && 
              <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                  {errors.fullName?.message}
              </Typography>
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="address_checkout" />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              {...register('address')}
              fullWidth
              name="address"
              placeholder="Input Address"
              error={errors.address && true} 
              focused={false}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                  },
              }}
            />
            { errors?.address && 
              <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                  {errors.address?.message}
              </Typography>
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="phone_checkout" />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              {...register('phone')}
              fullWidth
              name="phone"
              placeholder="Input Address"
              error={errors.address && true} 
              focused={false}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                  },
              }}
            />
            { errors?.phone && 
              <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                  {errors.phone?.message}
              </Typography>
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="province_checkout" />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Select
              {...register('province_id')}
              name="province_id"
              error={errors.province_id && true} 
              onChange={(e) => {
                handleProvinceChange(e.target.value);
              }}
              value={formData?.province_id ? formData?.province_id : '0'}
              fullWidth
              focused={false}
              sx={{ 
                borderRadius: '20px',
              }}
            >
              <MenuItem value={'0'}><FormattedMessage id="selectProvince_checkout" /></MenuItem>
              {province &&
                Array.isArray(province) &&
                province?.map((province) => (
                  <MenuItem key={province?.province_id} value={province?.province_id}>
                    {province?.province}
                  </MenuItem> 
                ))}
            </Select>
            { errors?.province_id && 
                <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                    {errors.province_id?.message}
                </Typography>
            }
          </Box>  
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="city_checkout" />
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Select
              {...register('city_id')}
              name="city_id"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="city"
              error={errors.city_id && true} 
              onChange={(e) => {
                handleCityChange(e.target.value); 
              }}
              value={formData?.city_id ? formData?.city_id : '0'}
              fullWidth
              focused={false}
              sx={{ 
                borderRadius: '20px',
              }}
            >
              <MenuItem value={'0'}><FormattedMessage id="selectCity_checkout" /></MenuItem>
              {city &&
                Array.isArray(city) &&  
                city?.map((city) => (
                  <MenuItem key={city?.city_id} value={city?.city_id}>
                    {city?.city_name}
                  </MenuItem>
                ))}
            </Select>
            { errors?.city_id && 
                <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                    {errors.city_id?.message}
                </Typography>
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            Layanan
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Select
              {...register('service')}
              name="service"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="service"
              error={errors.service && true} 
              onChange={(e) => {
                handleServiceChange(e.target.value); 
              }}
              value={formData?.service ? formData?.service : 'select'}
              fullWidth
              focused={false}
              sx={{ 
                borderRadius: '20px',
              }}
            >
              <MenuItem value={'select'}><FormattedMessage id="selectService_checkout" /></MenuItem>
              <MenuItem value={'cod'}><FormattedMessage id="takeInStore_checkout" /></MenuItem>
              <MenuItem value={'jne'}>JNE</MenuItem>
              <MenuItem value={'tiki'}>TIKI</MenuItem>
              <MenuItem value={'pos'}>POS</MenuItem>
            </Select>
            { errors?.service && 
              <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                  {errors.service?.message}
              </Typography>
            }
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }} className={classes.nextButton}>
            <FormattedMessage id="next_button" />
          </Button> 
        </Box>
      </form>
    </>
  )
}

AddressForm.propTypes = {
  province: PropTypes.array,
  city: PropTypes.array,
  shippingCost: PropTypes.number,
  profile: PropTypes.object,
  transaction: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  province: selectProvince,
  city: selectCity,
  shippingCost: selectShippingCost,
  profile: selectProfile,
  transaction: selectTransaction
});

export default connect(mapStateToProps)(AddressForm);
