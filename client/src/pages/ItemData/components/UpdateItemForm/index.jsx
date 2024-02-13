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

import { updateItemData } from '@pages/ItemData/actions';
import { selectItemDetail } from '@pages/Detail Item/selectors';
import { getItemDetail } from '@pages/Detail Item/actions';

import classes from './style.module.scss';

const UpdateItemFormModal = ({ isOpen, onClose, data, itemDataSelect }) => {
  const dispatch = useDispatch();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const { handleSubmit, control, reset, setValue } = useForm();

  useEffect(() => {
    if(isOpen === true && data) {
      dispatch(getItemDetail(data), () => {});
    }
  }, [data]);

  useEffect(() => {
    if (isOpen && itemDataSelect?.result) {
      setValue('name', itemDataSelect?.result?.name);
      setValue('desc', itemDataSelect?.result?.desc);
      setValue('price', itemDataSelect?.result?.price);
      setValue('stock', itemDataSelect?.result?.stock);
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
      name: data.name || itemDataSelect?.result?.name, 
      desc: data.desc || itemDataSelect?.result?.desc, 
      price: data.price || itemDataSelect?.result?.price, 
      stock: data.stock || itemDataSelect?.result?.stock,   
      img: image || itemDataSelect?.result?.img,
      author_id: 1
    };
    dispatch(updateItemData(itemDataSelect?.result?.id, updatedData));
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
              { showImage === false ? <img src={itemDataSelect?.result?.img} alt="" /> : <img src={showImage} alt="" />}
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