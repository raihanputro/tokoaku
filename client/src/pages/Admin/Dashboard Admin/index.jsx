  import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import { getTransactionData } from '../TransactionData/actions';
import { getuserData } from '../User Data/actions';
import { selectTransactionData } from '../TransactionData/selectors';
import { selectUserDataAdmin } from '../User Data/selectors';

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

const DashboardAdmin = ({ users, transactions }) => {
  const dispatch = useDispatch();

  const [income, setIncome] = useState(0);

  useEffect(() => {
    dispatch(getTransactionData());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getuserData());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    transactions.forEach(transaction => {
      if (transaction.status === 'SUCCESS') {
        transaction.order.forEach(order => {
            total += order.qty * order.price;
        });
    } 
    });
    setIncome(total);
  }, [transactions]);


  const filterUserAdmin = users?.filter(user => {
    if (user.role === 'Admin') {
      return true;
    };

    return false;
  });

  const filterUserCustomer = users?.filter(user => {
    if (user.role === 'Customer') {
      return true;
    };

    return false;
  });

  const filterTransactionPending = transactions?.filter(tr => {
    if (tr.status === 'PENDING') {
      return true;
    };

    return false;
  });
  
  return (
    <>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="dashboard_title" />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3%', marginTop: '2%' }}>
        <Card className={classes.cardContainer}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '8%' }}>
            <Box sx={{ padding: '20px', backgroundColor: '#87A922', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
              <PaidIcon sx={{ color: 'green', fontSize: '45px' }} />
            </Box>
            <Box>
              <Typography variant='p' component='div' sx={{ fontWeight: 'bolder', fontSize: '23px' }}>
                {formattedPrice(income)}
              </Typography>
              <Typography variant='p' component='div'>
                Pendapatan
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className={classes.cardContainer}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '8%' }}>
            <Box sx={{ padding: '20px', backgroundColor: '#F5DD61', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
              <ReceiptIcon sx={{ color: '#FAA300', fontSize: '45px' }} />
            </Box>
            <Box>
              <Typography variant='p' component='div' sx={{ fontWeight: 'bolder', fontSize: '25px' }}>
                {filterTransactionPending?.length}
              </Typography>
              <Typography variant='p' component='div'>
                Pesanan
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className={classes.cardContainer}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '8%' }}>
            <Box sx={{ padding: '20px', backgroundColor: '#50C4ED', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
              <PersonIcon sx={{ color: '#387ADF', fontSize: '45px' }} />
            </Box>
            <Box>
              <Typography variant='p' component='div' sx={{ fontWeight: 'bolder', fontSize: '25px' }}>
                {filterUserCustomer?.length} 
              </Typography>
              <Typography variant='p' component='div'>
                Pelanggan
              </Typography>
            </Box>
          </Box>
        </Card>
        <Card className={classes.cardContainer}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '8%' }}>
            <Box sx={{ padding: '20px', backgroundColor: '#BF3131', borderRadius: '20px', display: 'flex', justifyContent: 'center' }}>
              <ContactEmergencyIcon sx={{ color: '#7D0A0A', fontSize: '45px' }} />
            </Box>
            <Box>
              <Typography variant='p' component='div' sx={{ fontWeight: 'bolder', fontSize: '25px' }}>
                {filterUserAdmin?.length}
              </Typography>
              <Typography variant='p' component='div'>
                Admin
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3%', marginTop: '2%' }}>
        <Card className={classes.trCardContainer} sx={{ padding: '20px', borderRadius: '20px' }}>
          <Typography variant='p' component='div'>
            5 Transaksi Terbaru
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="id_table_row" /></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Customer</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Batas Bayar</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.slice(0, 5).map((tr, index) => (
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
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card className={classes.trCardContainer}  sx={{ padding: '20px', borderRadius: '20px', marginTop: '2%'  }}>
          <Typography variant='p' component='div'>
            5 Pelanggan Terbaru
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: '1%', borderRadius: '20px' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}></StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Id</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Username</StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontWeight: 'bolder', fontSize: '20px' }}>Fullname</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUserCustomer.slice(0, 5).map((usr, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                      {usr.photo !== null ? (
                        <Box
                          component="img"
                          sx={{
                            objectFit: "contain",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%"
                          }}
                          src={usr?.photo}
                        />
                      ) : (
                        <Avatar sx={{ height: "50px", width: "50px" }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">{usr?.id}</StyledTableCell>
                    <StyledTableCell align="center">{usr?.username}</StyledTableCell>
                    <StyledTableCell align="center">{usr?.fullName}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  )
}

DashboardAdmin.propTypes = {
  users: PropTypes.array,
  transactions: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  users: selectUserDataAdmin,
  transactions: selectTransactionData
});

export default connect(mapStateToProps)(DashboardAdmin);