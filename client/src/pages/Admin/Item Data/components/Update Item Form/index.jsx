import React, { useState, useEffect, useRef } from 'react';
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

import { updateItemData } from '../../actions';
import { selectItemDetail } from '@pages/Detail Item/selectors';
import { getItemDetail } from '@pages/Detail Item/actions';
import { setItemDetail } from '@pages/Detail Item/actions';

import classes from './style.module.scss';

const UpdateItemFormModal = ({ isOpen, onClose, id, itemDataSelect }) => {
  const dispatch = useDispatch();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm();

  useEffect(() => {
    if(id) {
      dispatch(getItemDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (isOpen === false) {
      dispatch(setItemDetail({}));
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && itemDataSelect) {
      setValue('name', itemDataSelect?.name);
      setValue('desc', itemDataSelect?.desc);
      setValue('price', itemDataSelect?.price);
      setValue('discount', itemDataSelect?.discount);
      setValue('stock', itemDataSelect?.stock);
    }
  }, [isOpen, itemDataSelect]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  const onSubmit = (data) => {
    const updatedData = {
      kategori_id: 1,
      name: data.name || itemDataSelect?.data?.name, 
      desc: data.desc || itemDataSelect?.data?.desc, 
      price: data.price || itemDataSelect?.data?.price, 
      discount: data.discount || itemDataSelect?.data?.discount, 
      stock: data.stock || itemDataSelect?.data?.stock,   
      img: image || itemDataSelect?.data?.img,
    };
    dispatch(updateItemData(itemDataSelect?.id, updatedData));
    reset();
    setImage(null);
    setShowImage(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom>
          <FormattedMessage id="update_modal_title" />
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.uploaderContainer}>
            <Box className={classes.imgUploader} onClick={() => imgRef.current.click()}>
              { showImage === false ? <img src={itemDataSelect?.img} alt="" /> : <img src={showImage} alt="" />}
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
                rules={{ required: 'Item Name is required' }}
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
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="desc_modal_input" />
              </Typography>
              <Controller
                name="desc"
                control={control}
                rules={{ required: 'Item Description is required' }}
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
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="price_modal_input" />
              </Typography>
              <Controller
                name="price"
                control={control}
                rules={{ required: 'Item Price is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    value={field.value}
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="discount_modal_input" />
              </Typography>
              <Controller
                name="discount"
                control={control}
                rules={{ required: 'Item discount is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    value={field.value}
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="stock_modal_input" />
              </Typography>
              <Controller
                name="stock"
                control={control}
                rules={{ required: 'Item stock is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    value={field.value}
                    margin="normal"
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
              sx={{ mt: 2 }}
              className={classes.updateButton}
            >
                <FormattedMessage id="update_modal_button" />
            </Button>
          </Box> 
        </form>
      </Box>
    </Modal>
  );
};

UpdateItemFormModal.propTypes = {
  itemDataSelect: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItemDetail,
});

export default connect(mapStateToProps)(UpdateItemFormModal);