import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import InfoIcon from '@mui/icons-material/Info';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardMedia from "@mui/material/CardMedia";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddUserForm from './components/Add User Form';
import UpdateUserForm from './components/Update User Form';
import DetailUser from './components/Detail User';

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

const UserData = ({users, theme}) => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [role, setRole] = useState('select');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
      dispatch(getuserData());
    }, [dispatch]);

    console.log(users, 'tst');

    const filteredUser = users?.filter(user => {
      if(user?.username?.toLowerCase().includes(search.toLocaleLowerCase()) && (role == 'select' || user?.role === role)) {
        return true;
      }
      return false;
    });

    const handleAddOpen = () => {
      setIsAddOpen(true);
    };
  
    const handleAddClose = () => {
      setIsAddOpen(false);
    };

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="user_data_title" />
      </Typography>
      <Box className={classes.filterContainer}>
          <TextField
              InputLabelProps={{shrink: false}}
              value={search}
              placeholder='Cari Pengguna'
              onChange={(e) => setSearch(e.target.value)}
              className={classes.search}
              sx={{ 
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
            placeholder='Cari Role'
            variant="outlined"
            value={role}
            InputLabelProps={{shrink: false}}
            onChange={(e) => setRole(e.target.value)}
            className={classes.role}
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
                    backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                    borderRadius: '20px',
                    marginTop: '5px'
                  },
                },
              },
            }}
          >
            <MenuItem value={'select'}>Semua</MenuItem>
            <MenuItem value={'Admin'}>Admin</MenuItem>
            <MenuItem value={'Customer'}>Customer</MenuItem>
          </TextField>
        </Box>
        <Button variant="contained" onClick={handleAddOpen} className={classes.addButton}><AddIcon /><FormattedMessage id="add_button" /></Button>
        <AddUserForm isOpen={isAddOpen} onClose={handleAddClose}/>
        <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="email_table_row" /></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="username_table_row" /></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="role_table_row" /></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="action_table_row" /></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { filteredUser ? filteredUser && Array.isArray(filteredUser) && filteredUser?.map((user, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                      {user.photo !== null ? (
                        <Box
                          component="img"
                          sx={{
                            objectFit: "contain",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%"
                          }}
                          src={user?.photo}
                        />
                      ) : (
                        <Avatar sx={{ height: "50px", width: "50px" }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">{user?.id}</StyledTableCell>
                    <StyledTableCell align="center">{user?.email}</StyledTableCell>
                    <StyledTableCell align="center">{user?.username}</StyledTableCell>
                    <StyledTableCell align="center">{user?.role}</StyledTableCell>  
                    <StyledTableCell align="center">
                      <Button><InfoIcon /></Button>
                    </StyledTableCell>  
                  </StyledTableRow>

                )) : <StyledTableCell align="center" colSpan={6}><FormattedMessage id="table_empty" /></StyledTableCell>}
              </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

UserData.propTypes = {
    users: PropTypes.object,
    theme: PropTypes.string,
  };
  
const mapStateToProps = createStructuredSelector({
  users: selectUserDataAdmin,
  theme: selectTheme
});
  
  export default connect(mapStateToProps)(UserData);