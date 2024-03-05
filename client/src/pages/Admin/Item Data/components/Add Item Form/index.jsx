import React, { useState, useEffect, useRef } from 'react';
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';

import { setItemData } from '../../actions';
import { getCategoryData } from '@pages/Admin/Category Data/actions';
import { selectCategoryData } from '@pages/Admin/Category Data/selectors';
import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const AddItemFormModal = ({ isOpen, onClose, theme, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgRef = useRef();

  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setShowImage(URL.createObjectURL(selectedImage));
    setImage(selectedImage);
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(getCategoryData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (onClose) {
      setShowImage(false);
      reset();
    }
  }, [onClose])

  const onSubmit = (data) => {
    dispatch(setItemData({ name: data.name, category_id: data.category_id, desc: data.desc, price: data.price, discount: data.discount, stock: data.stock, img: image }));
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
              { showImage === false ? <ImageIcon sx={{ width: '500px' }}/> : <img src={showImage} alt="" />}
              <input
                  type="file"
                  id=""
                  name="image"
                  accept="image/png, image/jpg, image/jpeg"
                  required
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
                    InputLabelProps={{shrink: false}}
                    sx={{ 
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        '&:hover fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '& fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',

                        },
                      },
                      '& .MuiInputBase-input': {
                        borderRadius: '20px',
                      }
                    }}
                  />
                )}
              />
            </Box>
            <Box className={classes.textUploader}>
              <Typography variant="body1" color="initial" className={classes.label}>
                <FormattedMessage id="category_modal_input" />
              </Typography>
              <Controller
                name="category_id"
                control={control}
                defaultValue={0}
                rules={{ required: 'category is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{shrink: false}}
                    className={classes.status}
                    sx={{ 
                      borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                          '& input[type=number]': {
                            '-moz-appearance': 'textfield', 
                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },
                            '&::-webkit-outer-spin-button': {
                              position: 'relative',
                              float: 'right',
                              visibility: 'hidden',
                            },
                          },
                          '&:hover fieldset': {
                            borderColor: theme == 'light' ? '#fff' : '#474F7A',
                          },
                          '& fieldset': {
                            borderColor: theme == 'light' ? '#fff' : '#474F7A',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme == 'light' ? '#fff' : '#474F7A',
                          },
                        },
                        '& .MuiInputBase-input': {
                          borderRadius: '20px',
                        }
                    }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                            borderRadius: '20px'
                          },
                        },
                      },
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
                </TextField>
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                    sx={{ 
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        '&:hover fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '& fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',

                        },
                      },
                      '& .MuiInputBase-input': {
                        borderRadius: '20px',
                      }
                    }}
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                    sx={{ 
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield', 
                          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                          '&::-webkit-outer-spin-button': {
                            position: 'relative',
                            float: 'right',
                            visibility: 'hidden',
                          },
                        },
                        '&:hover fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '& fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',

                        },
                      },
                      '& .MuiInputBase-input': {
                        borderRadius: '20px',
                      }
                    }}
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                    sx={{ 
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield', 
                          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                          '&::-webkit-outer-spin-button': {
                            position: 'relative',
                            float: 'right',
                            visibility: 'hidden',
                          },
                        },
                        '&:hover fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '& fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',

                        },
                      },
                      '& .MuiInputBase-input': {
                        borderRadius: '20px',
                      }
                    }}
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='number'
                    margin="normal"
                    error={!!field.error}
                    helperText={field.error ? field.error.message : null}
                    sx={{ 
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        '& input[type=number]': {
                          '-moz-appearance': 'textfield', 
                          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                            '-webkit-appearance': 'none',
                            margin: 0,
                          },
                          '&::-webkit-outer-spin-button': {
                            position: 'relative',
                            float: 'right',
                            visibility: 'hidden',
                          },
                        },
                        '&:hover fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '& fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme == 'light' ? '#fff' : '#474F7A',

                        },
                      },
                      '& .MuiInputBase-input': {
                        borderRadius: '20px',
                      }
                    }}
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

AddItemFormModal.propTypes = {
  category: PropTypes.array,
  theme: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  category: selectCategoryData,
  theme: selectTheme
});

export default connect(mapStateToProps)(AddItemFormModal);
