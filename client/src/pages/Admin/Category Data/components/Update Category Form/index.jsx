import React, { useState, useRef, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';

import { createCategoryData, getCategoryDetailData, updateCategoryData } from '../../actions';

import classes from './style.module.scss';

import { selectCategoryDetailData } from '../../selectors';

const UpdateCategoryForm = ({ isOpen, onClose, id, categoryData }) => {
  const dispatch = useDispatch();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const { handleSubmit, setValue, control, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if(id) {
      dispatch(getCategoryDetailData(id));
    }
  }, [id]);

  useEffect(() => {
    if (isOpen && categoryData) {
      setValue('name', categoryData?.name);
    }
  }, [isOpen, categoryData]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  const onSubmit = (data) => {
    dispatch(updateCategoryData(id, { name: data.name, icon: image || categoryData?.icon }));
    reset();
    setImage(null);
    setShowImage(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bolder' }}>
          <FormattedMessage id="add_modal_title" />
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.imgUploader} onClick={() => imgRef.current.click()}>
            { showImage === false ? <img src={categoryData?.icon} alt="" /> : <img src={showImage} alt="" />}
              <input
                  type="file"
                  id=""
                  name="image"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={imgRef}
                  onChange={handleImageChange}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="name_modal_input" />
              </Typography>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    error={!!errors.name} 
                    helperText={errors.name ? errors.name.message : null}
                  />
                )}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              className={classes.addButton}
            >
                <FormattedMessage id="add_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  );
};

UpdateCategoryForm.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  categoryData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  categoryData: selectCategoryDetailData
});

export default connect(mapStateToProps)(UpdateCategoryForm);
