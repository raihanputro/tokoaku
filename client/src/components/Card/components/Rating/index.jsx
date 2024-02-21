import React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import classes from './style.module.scss';

const Rating = ({ rating }) => {

    const renderStars = () => {
        const filledStars = Math.floor(rating);
        const hasHalfStar = rating - filledStars >= 0.5;
    
        let stars = [];
    
        for (let i = 0; i < filledStars; i++) {
          stars.push(<StarIcon sx={{ color: 'orange', fontSize: '25px' }} key={i} />);
        }
    
        if (hasHalfStar) {
          stars.push(<StarBorderIcon sx={{ color: 'orange', fontSize: '25px' }} key={filledStars} />);
        }
    
        const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
          stars.push(<StarBorderIcon sx={{ color: 'orange', fontSize: '25px' }} key={filledStars + (hasHalfStar ? 1 : 0) + i} />);
        }
    
        return stars;
      };

  return (
    <Box component='div' className={classes.ratingContainer}>
        {renderStars()}
    </Box>
  )
}

export default Rating