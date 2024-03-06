import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
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
import moment from 'moment';

import { getTransactionData, updateTransactionAdminData } from './actions';
import { selectTransactionData } from './selectors';
import { selectTheme } from '@containers/App/selectors';

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

const TransactionData = ({ theme, transactions }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedTrId, setSelectedTrId] = useState(null);

  useEffect(() => {
    dispatch(getTransactionData());
  }, [dispatch]);

  const filteredTransaction = transactions?.filter(tr => {
    if(tr?.id?.toString().includes(search) || tr?.fullName?.toLowerCase().includes(search?.toLocaleLowerCase()) && (status === '' || tr?.status === status)) {
      return true;
    }
    return false;
  });

  const handleUpdate = (trId) => {

  }

  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="transaction_data_title" />
      </Typography>
      <Box className={classes.filterContainer}>
          <TextField
              InputLabelProps={{shrink: false}}
              value={search}
              placeholder='Cari Transaksi dari id dan nama customer'
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
            placeholder='Cari status transaksi'
            variant="outlined"
            value={status}
            InputLabelProps={{shrink: false}}
            onChange={(e) => setStatus(e.target.value)}
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
                    backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                    borderRadius: '20px',
                    marginTop: '5px'
                  },
                },
              },
            }}
          >
            <MenuItem value={''}>Semua</MenuItem>
            <MenuItem value={'PENDING'}>Pending</MenuItem>
            <MenuItem value={'PROCESS'}>Proses</MenuItem>
            <MenuItem value={'SUCCESS'}>Sukses</MenuItem>
            <MenuItem value={'FAIL'}>Gagal</MenuItem>
          </TextField>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
                <TableHead>
                  <TableRow >
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Customer</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Batas Bayar</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Status</StyledTableCell>
                      <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="action_table_row" /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    { filteredTransaction?.length > 0 ? filteredTransaction && Array.isArray(filteredTransaction) && filteredTransaction?.map((tr, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{tr?.id}</StyledTableCell>
                                <StyledTableCell align="center">{tr?.fullName}</StyledTableCell>
                                <StyledTableCell align="center">{moment(tr.expiryAt).format('DD MMMM HH:mm')}</StyledTableCell>
                                <StyledTableCell align="center">
                                  {tr?.status === 'PENDING' && <Typography variant='p' component='div' className={classes.statusPending}>{tr?.status}</Typography>}
                                  {tr?.status === 'SUCCESS' && <Typography variant='p' component='div' className={classes.statusSucess}>{tr?.status}</Typography>}
                                  {tr?.status === 'PROCESS' && <Typography variant='p' component='div' className={classes.statusProcess}>{tr?.status}</Typography>}
                                  {tr?.status === 'FAIL' && <Typography variant='p' component='div' className={classes.statusFail}>{tr?.status}</Typography>}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  { tr?.status === 'PROCESS' &&
                                    <Button onClick={() => dispatch(updateTransactionAdminData(tr?.id))}><EditIcon /></Button>
                                  }
                                </StyledTableCell>
                            </StyledTableRow>
                      )) : <StyledTableCell align="center" colSpan={5}><FormattedMessage id="table_empty" /></StyledTableCell>}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

TransactionData.propTypes = {
  transactions: PropTypes.array,
  theme: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  transactions: selectTransactionData,
  theme: selectTheme,
});

export default connect(mapStateToProps)(TransactionData);