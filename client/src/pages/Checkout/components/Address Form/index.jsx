import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { setTransactionData, getProvinceData, getCityData, getShippingCostData } from '@pages/Checkout/actions';
import { selectCity, selectProvince, selectShippingCost } from '@pages/Checkout/selectors';
import { selectProfile } from '@pages/Profile/selectors';

import classes from './style.module.scss';

const AddressForm = ({ onNext, province, city, shippingCost, profile }) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, reset, setValue } = useForm();

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    if (!selectedProvince && !selectedCity) {
      dispatch(getProvinceData());
    }
  }, [dispatch, selectedProvince, selectedCity]);

  useEffect(() => {
    if (profile && profile.province_id) {
      setSelectedProvince(profile.province_id);
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.city_id) {
      setSelectedCity(profile.city_id);
    }
  }, [profile]);

  useEffect(() => {
    if (selectedProvince && !city.length) {
      dispatch(getCityData(selectedProvince));
    }
  }, [dispatch, selectedProvince, city.length]);

  useEffect(() => {
    dispatch(getShippingCostData({ 
      origin: '501', 
      destination: selectedCity ? selectedCity : profile?.city_id,
      weight: 500,
      courier: 'jne'
    }));
  }, [dispatch, selectedCity, profile]);

  const handleProvinceChange = async (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedCity(''); 
    dispatch(getCityData(provinceId));
  };

  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
  };

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile?.fullName);
      setValue('address', profile?.address);
    }
  }, [profile]);

  const onSubmit = (data) => {
    dispatch(setTransactionData({ 
      fullName: data.fullName, 
      address: data.address, 
      province_id: data.province_id ? data.province_id : profile.province_id, 
      city_id: data.city_id ? data.city_id : profile.city_id,
      shippingCost: shippingCost
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
          <Typography variant="body1" color="initial" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="fullName_checkout" />
          </Typography>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={field.value}     
                error={!!field.error}
                helperText={field.error ? field.error.message : null}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" color="initial" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="address_checkout" />
          </Typography>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={field.value}     
                error={!!field.error}
                helperText={field.error ? field.error.message : null}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" color="initial" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="province_checkout" />
          </Typography>
          <Controller
            name="province_id"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Role"
              onChange={(e) => {
                field.onChange(e); 
                handleProvinceChange(e.target.value); 
              }}
              value={selectedProvince}  
              fullWidth
            >
              <MenuItem value={'0'}><FormattedMessage id="selectProvince_checkout" /></MenuItem>
               {province &&
                  Array.isArray(province) &&
                  province.map((province) => (
                    <MenuItem key={province.province_id} value={province.province_id}>
                      {province.province}
                    </MenuItem>
                  ))}
            </Select>
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
          <Typography variant="body1" color="initial" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="city_checkout" />
          </Typography>
          <Controller
            name="city_id"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="city"
              onChange={(e) => {
                field.onChange(e); 
                handleCityChange(e.target.value); 
              }}
              value={selectedCity}  
              fullWidth
            >
              <MenuItem value={'0'}><FormattedMessage id="selectCity_checkout" /></MenuItem>
              {city &&
                  Array.isArray(city) &&
                  city.map((city) => (
                    <MenuItem key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </MenuItem>
                  ))}
            </Select>
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='submit' sx={{ mt: 3, ml: 1 }}>
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
};

const mapStateToProps = createStructuredSelector({
  province: selectProvince,
  city: selectCity,
  shippingCost: selectShippingCost,
  profile: selectProfile
});

export default connect(mapStateToProps)(AddressForm);