import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { formattedPrice } from '@utils/price';

import { getTransactionData } from './actions';
import { selectTransactionList } from './selectors';
import { selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const Order = ({ transactionList, theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    dispatch(getTransactionData());
  }, [dispatch]);

  const filteredTransaction = transactionList?.filter(tr => {
    if (tr?.order?.some(order => order?.item_name?.toLowerCase().includes(search.toLowerCase())) && (status === null || tr.status === status)) {
      return true;
    }
    return false;
  }) || [];
  
  return (
    <Box className={classes.container}>
      <Typography variant='h1' component='div' className={classes.pageTitle}>
        <FormattedMessage id="order_title" />
      </Typography>
      <Card className={classes.cardContainer} sx={{ minHeight: '160px', borderRadius: '20px'}}>
        <Box className={classes.filterContainer}>
          <TextField
              label={<FormattedMessage id="search_item_data" />}
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              className={classes.search}
          />
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.status}
            onChange={(e) => setStatus(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: theme === 'light' ? '#fff' : '#4f4557', 
                  },
                },
              },
            }}
          >
            <MenuItem value={null}>Semua</MenuItem>
            <MenuItem value={'PENDING'}>Pending</MenuItem>
            <MenuItem value={'PROCESS'}>Proses</MenuItem>
            <MenuItem value={'SUCCESS'}>Sukses</MenuItem>
            <MenuItem value={'FAIL'}>Gagal</MenuItem>
          </TextField>
        </Box> 
        <Box className={classes.contentContainer}>
          {filteredTransaction.length > 0 ? filteredTransaction && Array.isArray(filteredTransaction) && filteredTransaction?.map((tr, index) => (
            <Card key={index} className={classes.cardTransactionContainer} sx={{ minHeight: '120px', borderRadius: '20px'}}>
                <Box className={classes.contentTop}>
                  <Typography variant='p' component='div' sx={{ fontSize: '16px' }}>
                    Batas Bayar {moment(tr.expiryAt).format('DD MMM HH:mm')}
                  </Typography>
                    {tr?.status === 'PENDING' && <Typography variant='p' component='div' className={classes.statusPending}>{tr?.status}</Typography>}
                    {tr?.status === 'SUCCESS' && <Typography variant='p' component='div' className={classes.statusSucess}>{tr?.status}</Typography>}
                    {tr?.status === 'PROCESS' && <Typography variant='p' component='div' className={classes.statusProcess}>{tr?.status}</Typography>}
                    {tr?.status === 'FAIL' && <Typography variant='p' component='div' className={classes.statusFail}>{tr?.status}</Typography>}
                </Box>
                <Box className={classes.contentMain}>
                  <Box className={classes.mainContainer}>
                    <CardMedia 
                      component="img"
                      image={tr?.order[0]?.item?.img}
                      sx={{ width: 100 }}
                    />
                    <Box sx={{ paddingTop: '15px', display: 'flex', flexDirection: 'column', marginLeft: '5%' }}>
                      <Typography variant='p' component='div' sx={{ fontWeight: 'bold', marginBottom: '5%' }}>
                        {tr?.order[0]?.item?.name}
                      </Typography>
                      <Typography variant='p' component='div' sx={{ fontSize: '17px' }}>
                        {tr?.order[0]?.qty} Barang x {formattedPrice(tr?.order[0]?.item?.price)}
                      </Typography>
                      <Typography variant='p' component='div' sx={{ fontSize: '15px' }}>
                        {tr?.order?.length > 1 && 
                        <>
                          {tr?.order?.slice(1)?.length} barang lainnya
                        </>
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ paddingTop: '10px', paddingRight: '5%' }}>
                    <Typography variant='p' component='div'>
                      Total Belanja
                    </Typography>
                    <Typography variant='p' component='div' sx={{ fontWeight: 'bolder' }}>
                      {formattedPrice(tr.total)}
                    </Typography>
                    <Button 
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() =>  navigate(`/order/${tr?.id}`)}
                      className={classes.seeButton}
                    >
                      Lihat
                    </Button>
                  </Box>
                </Box>
                <Box>
                </Box>
            </Card> 
          )) : 
            <Typography variant='p' component='div' sx={{ fontSize: '30px', marginTop: '2%', marginLeft: '40%' }}>
              Pesanan Kosong
            </Typography>    
          }
        </Box> 
      </Card>
    </Box>
  )
}

Order.propTypes = {
  transactionList: PropTypes.array,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  transactionList: selectTransactionList,
  theme: selectTheme,
});

export default connect(mapStateToProps)(Order);