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

  const { handleSubmit, control, setValue } = useForm();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    province_id: '',
    city_id: '',
    service: ''
  });

  useEffect(() => {
    if (!province.length) {
      dispatch(getProvinceData());
    }
  }, [dispatch, province.length]);

  useEffect(() => {
    if (profile && profile.province_id) {
      setFormData(prevState => ({
        ...prevState,
        province_id: profile.province_id
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.city_id) {
      setFormData(prevState => ({
        ...prevState,
        city_id: profile.city_id
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (formData.province_id !== '' && !city.length) {
      dispatch(getCityData(formData.province_id));
    }
  }, [dispatch, formData.province_id, city.length]);

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile?.fullName);
      setValue('address', profile?.address);
      setValue('phone', profile?.phone);
    }
  }, [profile, setValue]);

  useEffect(() => {
    if (formData.service !== 'cod') {
      dispatch(getShippingCostData({ 
        origin: '501', 
        destination: formData.city_id ? formData.city_id : profile?.city_id,
        weight: 500,
        courier: formData.service 
      }));
    };
  }, [dispatch, formData.service, formData.city_id, profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProvinceChange = async (provinceId) => {
    setFormData(prevState => ({
      ...prevState,
      province_id: provinceId,
      city_id: ''
    }));
    dispatch(getCityData(provinceId));
  };

  const handleCityChange = async (cityId) => {
    setFormData(prevState => ({
      ...prevState,
      city_id: cityId
    }));
  };

  const handleServiceChange = async (service) => {
    setFormData(prevState => ({
      ...prevState,
      service: service
    }));
  };

  const onSubmit = () => {
    dispatch(setTransactionData({ 
      fullName: formData.fullName, 
      address: formData.address, 
      phone: formData.phone,
      province_id: formData.province_id ? formData.province_id : profile.province_id, 
      city_id: formData.city_id ? formData.city_id : profile.city_id,
      shippingCost: formData.service !== 'cod' ? shippingCost : 0,
      service: formData.service
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
          <TextField
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Input Fullname"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="address_checkout" />
          </Typography>
          <TextField
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Input Address"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="phone_checkout" />
          </Typography>
          <TextField
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Input Address"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="province_checkout" />
          </Typography>
          <Select
            name="province_id"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Role"
            onChange={(e) => {
              handleInputChange(e); 
              handleProvinceChange(e.target.value);
            }}
            value={formData.province_id}
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
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            <FormattedMessage id="city_checkout" />
          </Typography>
          <Select
            name="city_id"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="city"
            onChange={(e) => {
              handleInputChange(e); 
              handleCityChange(e.target.value); 
            }}
            value={formData.city_id}
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
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1%' }}>
          <Typography variant="body1" className={classes.label} sx={{ width: '200px' }}>
            Layanan
          </Typography>
          <Select
            name="service"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="service"
            onChange={(e) => {
              handleInputChange(e); 
              handleServiceChange(e.target.value); 
            }}
            value={formData.service}
            fullWidth
          >
            <MenuItem value={'pilih'}><FormattedMessage id="selectService_checkout" /></MenuItem>
            <MenuItem value={'cod'}><FormattedMessage id="takeInStore_checkout" /></MenuItem>
            <MenuItem value={'jne'}>JNE</MenuItem>
            <MenuItem value={'tiki'}>TIKI</MenuItem>
            <MenuItem value={'pos'}>POS</MenuItem>
          </Select>
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
};

const mapStateToProps = createStructuredSelector({
  province: selectProvince,
  city: selectCity,
  shippingCost: selectShippingCost,
  profile: selectProfile
});

export default connect(mapStateToProps)(AddressForm);
