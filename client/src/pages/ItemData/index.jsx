import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
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
import { getItemList } from '@pages/Home/actions';
import AddItemFormModal from './components/AddItemForm';
import UpdateItemFormModal from './components/UpdateItemForm';

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


const ItemData = (itemDataSelect) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [itemData, setItemData] = useState([]);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    useEffect(() => {
        dispatch(getItemList());
    }, [dispatch]);

    useEffect(() => {
      setItemData(itemDataSelect?.itemDataSelect?.result)
    }, [itemDataSelect]);

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
        <Button sx={{ marginTop: '7%' }} variant="contained" color='primary' onClick={handleModalOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
        <AddItemFormModal isOpen={isModalAddOpen} onClose={handleModalClose}/>
        <TableContainer component={Paper} sx={{ marginTop: '1%' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow >
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="id_table_row" /></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="name_table_row" /></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="price_table_row" /></StyledTableCell>
                      <StyledTableCell align="center"><FormattedMessage id="action_table_row" /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    { itemData && itemData?.map((item, index) => (
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
                                <StyledTableCell align="center">{item?.price}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleUpdateModalOpen(item?.id)}><EditIcon /></Button>
                                    <Button onClick={() => deleteItem(item?.id)} sx={{  color: 'red' }}><DeleteIcon /></Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <UpdateItemFormModal isOpen={isModalUpdateOpen} onClose={handleUpdateModalClose} data={selectedItemId} />
    </>
  )
}

ItemData.propTypes = {
    itemDataSelect: PropTypes.object,
  };
  
const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItem,
});
  
  export default connect(mapStateToProps)(ItemData);