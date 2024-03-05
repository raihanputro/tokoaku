import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { getCategoryData } from "@pages/Admin/Category Data/actions";
import { selectCategoryData } from "@pages/Admin/Category Data/selectors";

import classes from './style.module.scss';

const CategoryMenu = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCategoryData());
  }, [dispatch]);

  return (
    <Card className={classes.cardContainer}>
      {Array.isArray(category) && category.map((ctr, index) => (
        <Button onClick={() => navigate(`/search?name=&category=${ctr.id}`)} variant='contained' className={classes.contentContainer} key={index}>
          <CardMedia 
              component="img"
              height="100"
              width="50"
              image={ctr.icon}
              alt={ctr.name}
              sx={{ objectFit: "contain" }} 
          />
          <Typography variant="h5" component="div" className={classes.categoryTitle}>
                {ctr.name}
          </Typography>
        </Button>
      ))}
    </Card>
  )
};

CategoryMenu.propTypes = {
  category: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  category: selectCategoryData

})

export default connect(mapStateToProps)(CategoryMenu);