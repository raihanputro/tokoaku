import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, IconButton  } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';

import Rating from "./components/Rating";

import classes from './style.module.scss';

const CardItem = ({itemData}) => {

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const { id, name, price, discount, img, rating, sold } = itemData;

  const discountedPrice = discount > 0 ? price - (price * (discount / 100)) : price;

  const handleAddToWishlist = (event) => {
    // Handle adding to wishlist here
    event.stopPropagation(); // Prevent card click event from triggering
  };
  
  return (
    <Card sx={{ minWidth: 300, minHeight: 300, position: 'relative' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={(() => {
        navigate(`../item/${id}`)
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
                Rp{discountedPrice}
              </Typography>
              {discount > 0 &&
                <Box sx={{ display: 'flex', gap: '2%', mt: '2%' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '15px', fontWeight: 'bolder', textDecoration: 'line-through'}}>
                    Rp{price}
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
                  <IconButton onClick={handleAddToWishlist}>
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              }
            </CardContent>
          </CardActionArea>
        </Box>  
      </Card>
  )
}

export default CardItem