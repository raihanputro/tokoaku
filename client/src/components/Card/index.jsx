import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, IconButton  } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { formattedPrice } from "@utils/price";

import { getWishlistData, postWishlistData, deleteWishlistData } from "@pages/Wishlist/actions";
import { selectLogin } from "@containers/Client/selectors";
import { selectWishlist } from "@pages/Wishlist/selectors";

import Rating from "./components/Rating";

import classes from './style.module.scss';

const CardItem = ({ itemData, wishlistData, login }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const { id, name, price, discount, img, rating, sold } = itemData;

  const discountedPrice = discount > 0 ? price - (price * (discount / 100)) : price;

  useEffect(() => {
    if(Array.isArray(wishlistData)) {
      const isInWishlist = wishlistData.some(wishlist => wishlist?.item_id === id);
      setIsWishlist(isInWishlist);
    }
  }, [wishlistData, id]);

  useEffect(() => {
    if(login) {
      dispatch(getWishlistData());
    }
  }, [dispatch, login]);

  const handleWishlist = (event) => {
    event.stopPropagation();
    if(login) {
      if (isWishlist === false) {
        dispatch(postWishlistData({item_id: id}));
        setIsWishlist(true);
      } else {
        dispatch(deleteWishlistData(id));
        setIsWishlist(false);
      }
    } else {
      navigate('/login');
    }
  };
  
  return (
    <Card sx={{ minWidth: 300, minHeight: 300, position: 'relative' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={(() => {
       login ? navigate(`../item/${id}`) : navigate('/login')
      })}>  
        <Box className={classes.cardContainer}>
          <CardActionArea className={classes.cardContainer}>
            <CardMedia
              component="img"
              height="200"
              width="50"
              image={img}
              alt={name}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '20px'  }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '20px', fontWeight: 'bolder'}}>
                {formattedPrice(discountedPrice)}
              </Typography>
              {discount > 0 &&
                <Box sx={{ display: 'flex', gap: '2%', mt: '2%' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '15px', fontWeight: 'bolder', textDecoration: 'line-through'}}>
                    {formattedPrice(price)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '15px', fontWeight: 'bolder', color: 'red'}}>
                    {discount}%
                  </Typography>
                </Box> 
              }
              <Box className={classes.bottomContent}>
                <Rating rating={rating} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '17px' }}>
                  {sold}<FormattedMessage id="card_sold" />
                </Typography>
              </Box>
              {isHovered && 
                <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <IconButton onClick={handleWishlist}>
                    <FavoriteIcon sx={{ color: isWishlist ? 'red' : 'inherit' }}/>
                  </IconButton> 
                </Box>
              }
            </CardContent>
          </CardActionArea>
        </Box>  
      </Card>
  )
}

CardItem.propTypes = {
  itemData: PropTypes.object,
  wishlistData: PropTypes.array,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  wishlistData: selectWishlist,
  login: selectLogin
})

export default connect(mapStateToProps)(CardItem);