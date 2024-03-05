import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { deleteItemData } from './actions';
import { selectItem } from '@pages/Home/selectors';
import { selectTheme } from '@containers/App/selectors';
import { getItemList } from '@pages/Home/actions';
import { getCategoryData } from '../Category Data/actions';
import { selectCategoryData } from '../Category Data/selectors';
import AddItemFormModal from './components/Add Item Form';
import UpdateItemFormModal from './components/Update Item Form';
import { formattedPrice } from '@utils/price';

import classes from './style.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const ItemData = (itemDataSelect, categoryData, themeSelect) => {
    const dispatch = useDispatch();

    const [itemData, setItemData] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(0);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    
    useEffect(() => {
        dispatch(getCategoryData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getItemList());
    }, [dispatch]);

    useEffect(() => {
      setItemData(itemDataSelect?.itemDataSelect)
    }, [itemDataSelect]);

    const filteredItem = itemData?.filter(item => {
      if(item.name.toLowerCase().includes(search.toLocaleLowerCase()) && (category == '' || item.category_id === category)) {
        return true;
      }
      return false;
    });

    const deleteItem = (itemId) => {
      dispatch(deleteItemData(itemId));
    };

    const handleModalOpen = () => {
      setIsModalAddOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalAddOpen(false);
    };

    const handleUpdateModalOpen = (itemId) => {
      setSelectedItemId(itemId);
      setIsModalUpdateOpen(true);
    };
  
    const handleUpdateModalClose = () => {
      setIsModalUpdateOpen(false);
    };

  return (
    <>
        <Typography variant='h1' component='div' className={classes.pageTitle}>
          <FormattedMessage id="item_data_title" />
        </Typography>
        <Box className={classes.filterContainer}>
          <TextField
              InputLabelProps={{shrink: false}}
              value={search}
              placeholder='Cari Barang'
              onChange={(e) => setSearch(e.target.value)}
              className={classes.search}
              sx={{ 
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                },
                '& .MuiInputBase-input': {
                  borderRadius: '20px',
                }
              }}
          />
          <TextField
            select
            placeholder='Cari Kategori Barang'
            variant="outlined"
            value={category}
            InputLabelProps={{shrink: false}}
            onChange={(e) => setCategory(e.target.value)}
            className={classes.status}
            sx={{ 
              borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
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
                    backgroundColor: themeSelect === 'light' ? '#fff' : '#4f4557', 
                    borderRadius: '20px',
                    marginTop: '5px'
                  },
                },
              },
            }}
          >
            <MenuItem value={0}>Semua</MenuItem>
            <MenuItem value={1}>Makanan</MenuItem>
            <MenuItem value={2}>Minuman</MenuItem>
            <MenuItem value={3}>Obat</MenuItem>
          </TextField>
        </Box>
        <Button variant="contained" color='primary' onClick={handleModalOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
        <AddItemFormModal isOpen={isModalAddOpen} onClose={handleModalClose}/>
        <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow >
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="name_table_row" /></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="price_table_row" /></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="discount_table_row" /></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="action_table_row" /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    { filteredItem ? filteredItem && Array.isArray(filteredItem) && filteredItem?.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">
                                  <CardMedia
                                    component="img"
                                    height="80"
                                    width="50"
                                    image={item?.img}
                                    alt={item?.name}
                                    sx={{ objectFit: "contain" }}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="center">{item?.id}</StyledTableCell>
                                <StyledTableCell align="center">{item?.name}</StyledTableCell>
                                <StyledTableCell align="center">{formattedPrice(item?.price)}</StyledTableCell>
                                <StyledTableCell align="center">{item?.discount}%</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleUpdateModalOpen(item?.id)}><EditIcon /></Button>
                                    <Button onClick={() => deleteItem(item?.id)} sx={{  color: 'red' }}><DeleteIcon /></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                      )) : <StyledTableCell align="center" colSpan={5}><FormattedMessage id="table_empty" /></StyledTableCell>}
                </TableBody>
            </Table>
        </TableContainer>
        <UpdateItemFormModal isOpen={isModalUpdateOpen} onClose={handleUpdateModalClose} id={selectedItemId} />
    </>
  )
}

ItemData.propTypes = {
    itemDataSelect: PropTypes.array,
    categoryData: PropTypes.array,
    themeSelect: PropTypes.string
  };
  
const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItem,
  categoryData: selectCategoryData,
  themeSelect: selectTheme
});
  
export default connect(mapStateToProps)(ItemData);