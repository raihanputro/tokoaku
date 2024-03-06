import React, {useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { formattedPrice } from '@utils/price';

import { createTransactionData } from '@pages/Checkout/actions';
import { selectCity, selectProvince, selectTransaction } from '@pages/Checkout/selectors';
import { selectCart } from '@pages/Cart/selectors';
import { setStepCheckout } from '@pages/Checkout/actions';

import encryptPayload from '@utils/encryption';

import classes from './style.module.scss';

const Review = ({ onNext, onBack, transaction, province, city, cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += (item?.item?.price * item?.qty);
    });
    setSubTotal(total)
  }, [cart]);

  useEffect(() => {
    setTotal(subTotal + transaction?.shippingCost);
  }, [subTotal, transaction]);

  const filteredProvince = province?.filter(province => {
    if(province?.province_id === transaction?.province_id) {
      return true;
    }
    return false;
  });

  const filteredCity = city?.filter(city => {
    if(city?.city_id === transaction?.city_id) {
      return true;
    }
    return false;
  });

  const onSubmit = () => {
    const currentDate = new Date();

    const expiryDate = new Date(currentDate);
    expiryDate.setDate(expiryDate.getDate() + 1);

    dispatch(createTransactionData({
      fullName: transaction.fullName,
      address: transaction.address,
      phone: transaction.phone,
      province: filteredProvince[0]?.province,
      city: filteredCity[0]?.city_name,
      service: transaction.service,
      shippingCost: transaction.shippingCost,
      subtotal: subTotal,
      total: total,
      status: 'PENDING',
      orderAt: currentDate,
      expiryAt: expiryDate,
    }, (id) => {
      navigate(`../order/${id}`);
      dispatch(setStepCheckout(0));
    }));
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        <FormattedMessage id="order_summary_title" />
      </Typography>
      <List disablePadding>
        {cart.map((cart) => (
          <ListItem key={cart.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={cart.item.name}/>
            <Typography variant="body2" sx={{ paddingRight: '3px' }}>{cart.qty} x</Typography>
            <Typography variant="body2">{formattedPrice(cart.item.price)}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={'Subtotal'} />
            <Typography variant="body2">{formattedPrice(subTotal)}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={<FormattedMessage id="shippingCost_title" />} />
            <Typography variant="body2">{formattedPrice(transaction.shippingCost)}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formattedPrice(total)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            <FormattedMessage id="address_title" />
          </Typography>
          <Typography gutterBottom>{transaction.fullName}</Typography>
          <Typography gutterBottom>{transaction.address}, {filteredCity[0]?.city_name}, {filteredProvince[0]?.province}</Typography>
          <Typography gutterBottom>{transaction.service}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' className={classes.nextButton} onClick={() => onBack()} sx={{ mt: 3, ml: 5 }}>
            Kembali
          </Button> 
          <Button variant='contained' className={classes.nextButton} type='submit' sx={{ mt: 3, ml: 1 }} onClick={() => onSubmit()}>
            Pesan
          </Button> 
        </Box>
    </>
  )
}

Review.propTypes = {
  transaction: PropTypes.object,
  cart: PropTypes.array,
  province: PropTypes.array,
  city: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  transaction: selectTransaction,
  cart: selectCart,
  province: selectProvince,
  city: selectCity,
});

export default connect(mapStateToProps)(Review);