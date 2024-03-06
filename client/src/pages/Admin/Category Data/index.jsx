import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

import AddCategoryForm from './components/Add Category Form';
import UpdateCategoryForm from './components/Update Category Form';

import { getCategoryData, deleteCategoryData } from './actions';
import { selectCategoryData } from './selectors';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CategoryData = (categoryDataSelect) => {
  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategoryData());
  }, [dispatch]);

  useEffect(() => {
    setCategoryData(categoryDataSelect?.categoryDataSelect)
  }, [categoryDataSelect]);

  const filteredCategory = categoryData?.filter(category => {
    if(category.name.toLowerCase().includes(search.toLocaleLowerCase())) {
      return true;
    }
    return false;
  });

  const handleAddModalOpen = () => {
    setIsModalAddOpen(true);
  };

  const handleAddModalClose = () => {
    setIsModalAddOpen(false);
  };

  const handleUpdateModalOpen = (itemId) => {
    setSelectedCategoryId(itemId);
    setIsModalUpdateOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsModalUpdateOpen(false);
  };

  const deleteCategory = (categoryId) => {
    dispatch(deleteCategoryData(categoryId));
  };

  return (
    <>
        <Typography variant='h1' component='div' className={classes.pageTitle}>
          <FormattedMessage id="category_data_title" />
        </Typography>
        <Box className={classes.filterContainer}>
          <TextField
              label={<FormattedMessage id="search_category_data" />}
              variant="outlined"
              value={search}
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
        </Box>
        <Button variant="contained" color='primary' onClick={handleAddModalOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
        <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow >
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="id_table_row" /></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="name_table_row" /></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="action_table_row" /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    { filteredCategory ? filteredCategory && Array.isArray(filteredCategory) && filteredCategory?.map((category, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">
                                  <CardMedia
                                    component="img"
                                    height="80"
                                    width="50"
                                    image={category?.icon}
                                    alt={category?.name}
                                    sx={{ objectFit: "contain" }}
                                  />
                                </StyledTableCell>  
                                <StyledTableCell align="center">{category?.id}</StyledTableCell>
                                <StyledTableCell align="center">{category?.name}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleUpdateModalOpen(category?.id)}><EditIcon /></Button>
                                    <Button  sx={{  color: 'red' }} onClick={() => deleteCategory(category?.id)}><DeleteIcon /></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                      )) : <StyledTableCell align="center" colSpan={4}><FormattedMessage id="table_empty" /></StyledTableCell>}
                </TableBody>
            </Table>
        </TableContainer>
        <AddCategoryForm isOpen={isModalAddOpen} onClose={handleAddModalClose} />
        <UpdateCategoryForm isOpen={isModalUpdateOpen} onClose={handleUpdateModalClose} id={selectedCategoryId} />

    </>
  )
}

CategoryData.propTypes = {
  categoryDcategoryDataSelectata: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  categoryDataSelect: selectCategoryData,
});

export default connect(mapStateToProps)(CategoryData);