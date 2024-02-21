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
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";

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
    let total = 0;
    cartData.forEach(item => {
      total += (item?.item?.price * item?.qty);
    });
    setSubTotal(total)
  }, [cartData]);

  const increment = (itemId, qty) => {
    const newQty = qty + 1;
    dispatch(updateDataCart(itemId, {qty: newQty}))
  };

  const decrement = (cartId, qty) => {
    const newQty = qty - 1;
    if (newQty >= 1) {
      dispatch(updateDataCart(cartId, {qty: newQty}))
    } else {
      dispatch(deleteDataCart(cartId));
    }
  };

  console.log(cartData)
  
  return (
    <Box className={classes.container}>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="cart_title" />
      </Typography>
      <Box className={classes.contentContainer}>
        <Card sx={{  marginTop: '1%', borderRadius: '20px', width: '100%', height: '160px',  }}>
          <Box className={classes.cardContainer}>
            {cartData.length >= 1 ? cartData && Array.isArray(cartData) && cartData?.map((cart, index) => (
              <Box key={index} className={classes.contentContainer}>
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
                  <Typography variant='h6' component='div' sx={{ paddingLeft: '50px' }}>
                    Rp{cart?.item?.price}  
                  </Typography>
                  <Box className={classes.stockContainer}>
                    <Button onClick={() => dispatch(deleteDataCart(cart?.id, userDataSelect?.id))}>
                        <DeleteIcon sx={{ color: 'red' }} />
                    </Button>
                    <Box className={classes.adjustStockContainer}>
                      <Button onClick={() =>  decrement(cart?.id, cart?.qty)}>
                        <RemoveIcon />
                      </Button>
                      {cart?.qty}
                      <Button onClick={() => increment(cart?.id, cart?.qty)}>
                        <AddIcon />
                      </Button>
                    </Box>
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
          <Card sx={{  marginTop: '1%', borderRadius: '20px', height: '160px', width: '100%', maxWidth: '300px' }}>
            <Box className={classes.cardSummaryContainer}>
              <Typography variant='h1' component='div' className={classes.summaryTitle} sx={{ textAlign: 'center' }}>
                <FormattedMessage id="summary_cart_title" />
              </Typography>
              <Box className={classes.total}>
                <Typography variant='h1' component='div' className={classes.totalText}>
                  <FormattedMessage id="total_title" />
                </Typography>
                <Typography variant='h1' component='div' className={classes.totalText}>
                  Rp{subTotal}
                </Typography>
              </Box>
              <Button sx={{ marginTop: '20px' }}>
                <FormattedMessage id="buy_title" />
              </Button>
            </Box>
          </Card>
        }   
      </Box>
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