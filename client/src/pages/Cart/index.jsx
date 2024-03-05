import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { formattedPrice } from '@utils/price';

import { updateDataCart, deleteDataCart } from './actions';
import { selectCart } from './selectors';
import { selectUser } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Cart = ({cartDataSelect, userDataSelect}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setCartData(cartDataSelect);
  }, [cartDataSelect]); 

  useEffect(() => {
    if (Array.isArray(cartData)) {
      let total = 0;
      cartData?.forEach(item => {
        total += (item?.price * item?.qty);
      });
      setSubTotal(total);
    }
  }, [cartData]);

  const increment = (itemId, qty) => {
    const newQty = qty + 1;
    dispatch(updateDataCart(itemId, {qty: newQty}, (err) => {
      toast(err, {
        style: {
          marginTop: '2%',
        }
      });
    }))
  };

  const decrement = (cartId, qty) => {
    const newQty = qty - 1;
    if (newQty >= 1) {
      dispatch(updateDataCart(cartId, {qty: newQty}));
    } else {
      dispatch(deleteDataCart(cartId));
    }
  };

  return (
    <Box className={classes.container}>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="cart_title" />
      </Typography>
      <Box className={classes.contentContainer}>
        <Card sx={{  marginTop: '1%', borderRadius: '20px', width: '102%', minHeight: '160px' }}>
          <Box className={classes.cardContainer}>
            { cartData.length >= 1 ? cartData && Array.isArray(cartData) && cartData?.map((cart, index) => (
              <Box key={index} className={classes.contentCardContainer}>
                <Box className={classes.contentLeft}>
                  <CardMedia 
                    component="img"
                    image={cart?.item?.img}
                    sx={{ width: 150 }}
                  />
                  <Typography variant='h6' component='div'>
                    {cart?.item?.name}  
                  </Typography>
                </Box>
                <Box className={classes.contentRight}>
                  <Box className={classes.contentRightTop}>
                    <Typography variant='h6' component='div'>
                      {formattedPrice(cart?.price)}  
                    </Typography>
                    {cart?.item?.discount > 0 &&
                      <Box sx={{ display: 'flex', gap: '5%' }}>
                        <Typography variant="body2" sx={{ fontSize: '15px', fontWeight: 'bolder', color: '#B80000', backgroundColor: '#FF8989', width: 'fit-content', padding: '5px', borderRadius: '20px'}}>
                          {cart?.item?.discount}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px', fontWeight: 'bolder', textDecoration: 'line-through'}}>
                          {formattedPrice(cart?.item?.price)}
                        </Typography>
                      </Box>
                    }
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Button onClick={() => dispatch(deleteDataCart(cart?.id, userDataSelect?.id))}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </Button>
                    <Card className={classes.stockContainer}>
                      <Box className={classes.adjustStockContainer}>
                        <Button onClick={() =>  decrement(cart?.id, cart?.qty)}>
                          <RemoveIcon sx={{ color: 'red' }} />
                        </Button>
                        {cart?.qty}
                        <Button onClick={() => increment(cart?.id, cart?.qty)}>
                          <AddIcon sx={{ color: 'green' }} />
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Box>
            )) : 
              <Typography variant='p' component='div' className={classes.cartEmpty}>
                Keranjang kosong
              </Typography>
            }
          </Box>
        </Card>
        {cartData.length >= 1 && 
          <Card className={classes.cardSummaryContainer}>
              <Typography variant='h1' component='div' className={classes.summaryTitle} sx={{ textAlign: 'center' }}>
                <FormattedMessage id="summary_cart_title" />
              </Typography>
              <Box className={classes.total}>
                <Typography variant='h1' component='div' className={classes.totalText}>
                  <FormattedMessage id="total_title" />
                </Typography>
                <Typography variant='h1' component='div' className={classes.totalText}>
                  {formattedPrice(subTotal)}
                </Typography>
              </Box>
              <Button variant='contained' className={classes.buyButton} sx={{ marginTop: '20px', width: '100%' }} onClick={() => navigate('/checkout')}>
                <FormattedMessage id="buy_title" />
              </Button>
          </Card>
        }   
      </Box>
      <Toaster />
    </Box>
  )
}

Cart.propTypes = {
  cartDataSelect: PropTypes.array,
  userDataSelect: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
  cartDataSelect: selectCart,
  userDataSelect: selectUser
})

export default connect(mapStateToProps)(Cart);