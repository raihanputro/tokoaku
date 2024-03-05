import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { getReviewDataByTr, createReviewData, updateReviewData } from '@pages/Order Detail/actions';
import { selectReviewTr } from '@pages/Order Detail/selectors';

import classes from './style.module.scss';

const ReviewOrder = ({ isOpen, onClose, id, existingReview, review }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ratingValue, setRatingValue] = useState(0);

  const {
    handleSubmit, 
    register,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if(isOpen, id, existingReview) {
      dispatch(getReviewDataByTr(id));
    }
  }, [isOpen, id, existingReview]);

  useEffect(() => {
    if (isOpen && review) {
      setRatingValue(review?.rating);
      setValue('comment', review?.comment);
    }
  }, [isOpen, review]);

  const handleRating= async (rating) => {
    setRatingValue(rating);
  };

  const onSubmit = (data) => { 
    if (!existingReview) {
      dispatch(createReviewData({ transaction_id: id, rating: ratingValue, comment: data.comment }));
      navigate(0);
      reset();
    } else {
      dispatch(updateReviewData({ transaction_id: id, rating: ratingValue|| review?.rating, comment: data.comment || review?.comment }));
      navigate(0);
      reset();
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" sx={{ marginBottom: '4%', fontWeight: 'bolder' }} gutterBottom>
          Berikan Review
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Rating
              </Typography>
              <Rating
                {...register('rating')}
                value={ratingValue}
                precision={1}
                onChange={(e) => {
                  handleRating(e.target.value);
                }}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Comment
              </Typography>
              <TextField
                {...register('comment')}
                focused={false}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.reviewButton}
              sx={{ mt: 2 }}
            >
                Review      
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

ReviewOrder.propTypes = {
  review: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  review: selectReviewTr,
});

export default connect(mapStateToProps)(ReviewOrder);