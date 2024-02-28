import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Avatar from '@mui/material/Avatar';
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";

import { formattedPrice } from '@utils/price';
import Rating from '@components/Card/components/Rating';

import { setCartitem } from './actions';
import { getItemDetail, setItemDetail } from './actions';
import { selectItemDetail } from './selectors';
import { selectUser } from '@containers/Client/selectors';

import classes from './style.module.scss';

const DetailItem = ({itemDataSelect, userDataSelect}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [count, setCount] = useState(1);
  const [itemData, setItemData] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const discountedPrice = itemData?.discount > 0 ? itemData?.price - (itemData?.price * (itemData?.discount / 100)) : itemData?.price;

  useEffect(() => {
    if (id) {
      dispatch(getItemDetail(id), () => {})
    } else {
      navigate('/');
    }

    return () => {
      dispatch(setItemDetail({}));
    };
  }, [id]);

  console.log(itemData, 'ssfs')

  useEffect(() => {
    setItemData(itemDataSelect)
  }, [itemDataSelect]);

  useEffect(() => {
    const newSubtotal = count * itemData?.price;
    setSubTotal(newSubtotal)
  }, [count, itemData?.price]);

  const increment = () => {
    if(count < itemData?.stock) {
      setCount(count+1);
    } 
  };

  const decrement = () => {
    if( count > 1) {
      setCount(count-1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(setCartitem({item_id: itemData?.id, user_id: userDataSelect.id, price: discountedPrice, qty: count}));
    setCount(1);
  };

  return (
    <Box className={classes.container}>
      <Card sx={{ marginTop: '2%', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
        <Box className={classes.allContent} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box className={classes.cardContainer}>
            <CardMedia 
              component="img"
              image={itemData?.img}
              sx={{ width: 400 }}
            />
            <Box className={classes.itemInfo}>
              <CardContent>
                <Box>
                  <Typography variant='h6' component='div' className={classes.itemTitle}>
                    {itemData?.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '5%', alignItems: 'center', width: '100%'}}>
                    <Typography variant='p' component='div'>
                      Terjual {itemData?.sold}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10%', alignItems: 'center'}}>
                      <StarIcon sx={{ color: 'orange' }} />
                      <Typography variant='p' >
                        {itemData?.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ marginBottom: '3%' }}>
                  <Typography variant='h6' component='div' className={classes.itemPrice}> 
                    {formattedPrice(discountedPrice)}
                  </Typography>
                  {itemData?.discount > 0 &&
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2%' }}>
                      <Typography variant="body2" sx={{ fontSize: '20px', fontWeight: 'bolder', color: '#B80000', backgroundColor: '#FF8989', width: 'fit-content', padding: '5px', borderRadius: '20px'}}>
                        {itemData?.discount}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px', fontWeight: 'bolder', textDecoration: 'line-through'}}>
                        {formattedPrice(itemData?.price)}
                      </Typography>
                    </Box>
                  }
                </Box>
                <Typography variant='h6' component='div' className={classes.itemDesc}>
                  {itemData?.desc}
                </Typography>
              </CardContent>
            </Box>
            <Card className={classes.addItem}>
              <Typography variant='h6' component='div' className={classes.itemAddTitle}>
                  Atur jumlah
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2%', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '9%' }}>
                  <Button variant='contained' className={classes.cartButton} onClick={() =>  decrement()}>
                    <RemoveIcon sx={{ color: 'red' }} />
                  </Button>
                  {count}
                  <Button variant='contained' className={classes.cartButton} onClick={() => increment()}>
                    <AddIcon sx={{ color: 'green' }} />
                  </Button>
                </Box>
                <Typography variant='p' component='div' sx={{ marginBottom: '2%' }}>
                    Stok: {itemData?.stock} 
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '19%', width: '100%', justifyContent: 'space-between', marginTop: '3%' }}>
                <Typography variant='h6' component='div' sx={{ marginBottom: '2%' }}>
                    Subtotal 
                </Typography>
                <Typography variant='h6' component='div' sx={{ marginBottom: '2%' }}>
                    {formattedPrice(subTotal)}
                </Typography>
              </Box>
              <Button variant='contained' className={classes.cartButton} onClick={onSubmit}>
                <AddShoppingCartIcon sx={{ paddingRight: '1%', color: '#FBA834' }} /> Keranjang
              </Button>
            </Card> 
          </Box>
            <Box>
              <Typography variant='h2' component='div' sx={{ marginBottom: '1%', marginTop: '1%',  fontWeight: 'bolder', fontSize: '30px', paddingLeft: '1%'}}>
                  Ulasan
              </Typography>
              <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '1%' }}>
                {itemData?.review?.length > 1 ? itemData?.review?.map((review, index) => (
                  <Card className={classes.cardUlasan} key={index} sx={{ borderRadius: '20px', padding: '10px', display: 'flex', alignItems: 'center', gap: '1%' }}>
                    <Avatar  />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='p' component='div' sx={{ fontWeight: 'bolder' }}>
                          {review.user.username}
                      </Typography>
                      <Rating rating={review.rating} />
                      <Typography variant='p' component='div'>
                          {review.comment}
                      </Typography>
                    </Box>
                  </Card>
                )) : 
                  <Card className={classes.cardUlasan} sx={{ borderRadius: '20px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1%' }}>
                      <Typography variant='p' component='div'>
                          Belum diulas!
                      </Typography>
                  </Card>
                }
              </Box>
            </Box>
        </Box>
      </Card>
    </Box>
  )
}

DetailItem.propTypes = {
  itemDataSelect: PropTypes.object,
  userDataSelect: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItemDetail,
  userDataSelect: selectUser
})

export default connect(mapStateToProps)(DetailItem);