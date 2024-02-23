import * as React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import { selectCity, selectProvince, selectTransaction } from '@pages/Checkout/selectors';
import { selectCart } from '@pages/Cart/selectors';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const Review = ({ transaction, province, city, cart }) => {
  console.log(transaction, 'test tr review');
  console.log(province, 'test tr province');
  console.log(city, 'test tr city');

  const filteredProvince = province?.filter(province => {
    if(province.province_id === transaction.province_id) {
      return true;
    }
    return false;
  });

  const filteredCity = city?.filter(city => {
    if(city.city_id === transaction.city_id) {
      return true;
    }
    return false;
  });

  console.log(filteredProvince, 'filter')

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={'Shipping'} />
            <Typography variant="body2">Rp{transaction.shippingCost}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{transaction.fullName}</Typography>
          <Typography gutterBottom>{transaction.address}, {filteredCity[0].city_name}, {filteredProvince[0].province}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Review.propTypes = {
  transaction: PropTypes.object,
  province: PropTypes.array,
  city: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  transaction: selectTransaction,
  province: selectProvince,
  city: selectCity,
});

export default connect(mapStateToProps)(Review);