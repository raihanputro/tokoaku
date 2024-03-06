import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { updateItemData } from '../../actions';
import { selectItemDetail } from '@pages/Detail Item/selectors';
import { getCategoryData } from '@pages/Admin/Category Data/actions';
import { selectCategoryData } from '@pages/Admin/Category Data/selectors';
import { getItemDetail } from '@pages/Detail Item/actions';
import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name item is a required field"),
  category_id: yup
    .number()
    .required("Category is required!")
    .test('is-not-select', 'Category is required!', function(value) {
      return value !== '0';
    }),
  desc: yup
    .string()
    .required("Desc is required!"),
  price: yup
    .number()
    .required("Desc is required!")
    .min(0, "Stock must be greater than or equal to 0"),
  stock: yup
    .number()
    .required("Stock is required!")
    .min(0, "Stock must be greater than or equal to 0"),
  discount: yup
    .number()
    .required("Discount is required!")
    .min(0, "Stock must be greater than or equal to 1"),
});

const UpdateItemFormModal = ({ isOpen, onClose, id, theme, category, itemDataSelect }) => {
  const dispatch = useDispatch();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [categoryIdValue, setcategoryIdValue] = useState('');


  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if(id) {
      dispatch(getItemDetail(id));
    }
  }, [id]);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCategoryData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && itemDataSelect) {
      setValue('name', itemDataSelect?.name);
      setcategoryIdValue(itemDataSelect?.category_id)
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
      category_id: data.category_id || itemDataSelect?.data?.category_id,
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

  const handleCategoryChange = (categoryId) => {
    setcategoryIdValue(categoryId);
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={classes.modalContainer}>
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bolder' }}>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                  {...register('name')}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder='Enter name item'
                  error={errors.name && true} 
                  fullWidth
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                        },
                  }}
                />
                { errors.name && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.name?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="category_modal_input" />
              </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '2%', marginBottom: '2%' }}>
                  <Select
                    {...register('category_id')}
                    name="category_id"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    error={errors.category_id && true} 
                    onChange={(e) => {
                      handleCategoryChange(e.target.value); 
                    }}
                    value={categoryIdValue ? categoryIdValue : '0'}
                    fullWidth
                    focused={false}
                    sx={{ 
                      width: '600px', 
                      marginLeft: '7%',
                      borderRadius: '20px',
                    }}
                  >
                    <MenuItem key={0} value={0}>
                      <FormattedMessage id="categorySelect_modal_input" />
                    </MenuItem>
                    {category && Array.isArray(category) && category?.map(category =>(
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))} 
                  </Select>
                  { errors?.city_id && 
                      <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                          {errors.city_id?.message}
                      </Typography>
                  }
                </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="desc_modal_input" />
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                  {...register('desc')}
                  aria-invalid={errors.desc ? "true" : "false"}
                  placeholder='Enter desc'
                  error={errors.desc && true} 
                  fullWidth
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                        },
                  }}
                />
                { errors.desc && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.desc?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="price_modal_input" />
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                  {...register('price')}
                  aria-invalid={errors.price ? "true" : "false"}
                  placeholder='Enter price'
                  error={errors.price && true} 
                  fullWidth
                  type='number'
                  focused={false}
                  className={classes.inputText}
                  sx={{ 
                      '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                        },
                  }}
                />
                { errors.price && 
                    <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                        {errors.price?.message}
                    </Typography>
                }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="discount_modal_input" />
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                    {...register('discount')}
                    aria-invalid={errors.discount ? "true" : "false"}
                    placeholder='Enter discount'
                    error={errors.price && true} 
                    fullWidth
                    type='number'
                    focused={false}
                    className={classes.inputText}
                    sx={{ 
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                          },
                    }}
                  />
                  { errors.discount && 
                      <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                          {errors.discount?.message}
                      </Typography>
                  }
              </Box>
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="stock_modal_input" />
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '2%', marginBottom: '2%' }}>
                <TextField
                    {...register('stock')}
                    aria-invalid={errors.stock ? "true" : "false"}
                    placeholder='Enter stock'
                    error={errors.stock && true} 
                    fullWidth
                    type='number'
                    focused={false}
                    className={classes.inputText}
                    sx={{ 
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                          },
                    }}
                  />
                  { errors.stock && 
                      <Typography variant='body' component='div' sx={{ fontSize: '15px', marginTop: '1%', color: '#d82c2c'  }}>
                          {errors.stock?.message}
                      </Typography>
                  }
              </Box>
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
  category: PropTypes.array,
  theme: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItemDetail,
  category: selectCategoryData,
  theme: selectTheme
});

export default connect(mapStateToProps)(UpdateItemFormModal);