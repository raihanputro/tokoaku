import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddUserForm from './components/AddUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import DetailUser from './components/DetailUser';

import { selectTheme } from '@containers/App/selectors';
import { selectUserDataAdmin } from './selectors';
import { getuserData } from './actions';
import { deleteUserData } from './actions';

import classes from './style.module.scss';

const StyledTableCell = styled(TableCell)(() => ({
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

const UserData = ({userDataSelect, theme}) => {
    const dispatch = useDispatch();

    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      dispatch(getuserData());
    }, [dispatch]);

    useEffect(() => {
        setUserData(userDataSelect?.result)
    }, [userDataSelect]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    const handleCloseAgree = (userId) => {
      dispatch(deleteUserData(userId));
      setOpen(false);
    };

    const handleModalOpen = () => {
      setIsModalAddOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalAddOpen(false);
    };

    const handleUpdateModalOpen = (userId) => {
      setSelectedUserId(userId);
      setIsModalUpdateOpen(true);
    };
  
    const handleUpdateModalClose = () => {
      setIsModalUpdateOpen(false);
    };

    const handleDetailModalOpen = (userId) => {
      setSelectedUserId(userId);
      setIsModalDetailOpen(true);
    };
  
    const handleDetailModalClose = () => {
      setIsModalDetailOpen(false);
    };

  return (
    <>
        <Button sx={{ marginTop: '7%' }} variant="contained" onClick={handleModalOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
        <TableContainer component={Paper} sx={{ marginTop: '1%' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align="center"><FormattedMessage id="id_table_row" /></StyledTableCell>
                    <StyledTableCell align="center"><FormattedMessage id="username_table_row" /></StyledTableCell>
                    <StyledTableCell align="center"><FormattedMessage id="role_table_row" /></StyledTableCell>
                    <StyledTableCell align="center"><FormattedMessage id="action_table_row" /></StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    { userData && userData?.map((udt, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{udt?.id}</StyledTableCell>
                                <StyledTableCell align="center">{udt?.username}</StyledTableCell>
                                <StyledTableCell align="center">{udt?.role}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => handleDetailModalOpen(udt?.id)}><InfoIcon sx={{ color: 'yellow' }}/></Button>
                                    {udt?.role === 'admin' &&  
                                      <>
                                        <Button onClick={() => handleUpdateModalOpen(udt?.id)}><EditIcon /></Button>
                                        <Button sx={{ color: 'red' }} onClick={handleClickOpen}><DeleteIcon /></Button>
                                        <Dialog
                                          open={open}
                                          onClose={handleClose}
                                          aria-labelledby="alert-dialog-title"
                                          aria-describedby="alert-dialog-description"
                                          className={classes.modalContainer}
                                          PaperProps={{ 
                                            sx: {
                                              backgroundColor: theme == 'light' ? '#fff' : '#474F7A'
                                            }
                                           }}
                                        >
                                          <DialogTitle id="alert-dialog-title">
                                            <FormattedMessage id="dialog_delete_title" />
                                          </DialogTitle>
                                          <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                              <FormattedMessage id="dialog_delete_confirm" />{udt?.id}
                                            </DialogContentText>
                                          </DialogContent>
                                          <DialogActions>
                                            <Button onClick={handleClose}>                                             
                                              <FormattedMessage id="dialog_delete_button_disagree" />
                                            </Button>
                                            <Button onClick={() => handleCloseAgree(udt?.id)} autoFocus>
                                             <FormattedMessage id="dialog_delete_button_agree" />
                                            </Button>
                                          </DialogActions>
                                        </Dialog>
                                      </>
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <AddUserForm isOpen={isModalAddOpen} onClose={handleModalClose} />
        <UpdateUserForm isOpen={isModalUpdateOpen} onClose={handleUpdateModalClose} id={selectedUserId} />
        <DetailUser isOpen={isModalDetailOpen} onClose={handleDetailModalClose} id={selectedUserId}/>
    </>
  )
}

UserData.propTypes = {
    userDataSelect: PropTypes.object,
    theme: PropTypes.string,
  };
  
const mapStateToProps = createStructuredSelector({
  userDataSelect: selectUserDataAdmin,
  theme: selectTheme
});
  
  export default connect(mapStateToProps)(UserData);