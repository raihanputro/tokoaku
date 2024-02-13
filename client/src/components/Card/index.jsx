import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";

import classes from './style.module.scss';

const CardItem = ({itemData}) => {

  const navigate = useNavigate();

  const { id, name, price, img } = itemData;
  
  return (
    <Card sx={{ minWidth: 300, minHeight: 300 }} onClick={(() => {
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
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '20px' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px', fontWeight: 'bolder' }}>
              Rp{price}
            </Typography>
          </CardContent>
        </CardActionArea>
        </Box>
      </Card>
  )
}

export default CardItem