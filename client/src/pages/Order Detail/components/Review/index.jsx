import React, { useState, useEffect } from 'react';
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

  const { handleSubmit, control, reset, setValue } = useForm();

  console.log(review, 'ttttt');

  useEffect(() => {
    if(id && existingReview) {
      dispatch(getReviewDataByTr(id));
    }
  }, [id, existingReview]);

  useEffect(() => {
    if (isOpen && review) {
      setValue('rating', review?.rating);
      setValue('comment', review?.comment);
    }
  }, [isOpen, review]);

  const onSubmit = (data) => { 
    if (existingReview) {
      dispatch(updateReviewData({ transaction_id: id, rating: data.rating || review?.rating, comment: data.comment || review?.comment }))
    } else {
      dispatch(createReviewData({ transaction_id: id, rating: data.rating, comment: data.comment }));
    };
    reset();
    onClose();
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
              <Controller
                name="rating"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value}
                    precision={1}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                Comment
              </Typography>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    value={field.value}                   
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
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