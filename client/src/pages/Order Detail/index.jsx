import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Rating from '@components/Card/components/Rating';
import ReviewOrder from './components/Review';

import { getTransactionDetailData, updateTransactionDetailData } from './actions';
import { setTransactionDetailData } from './actions';
import { selectTransactionDetail } from './selectors';

import classes from './style.module.scss';

const OrderDetail = ({ transaction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewModalOpen = () => {
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
    navigate(0);
  };

  useEffect(() => {
    if (id) {
      dispatch(getTransactionDetailData(id))
    } else {
      navigate('/');
    }

    return () => {
      dispatch(setTransactionDetailData([]));
    };
  }, [id]);

  const onPressPay = async () => {
    window.snap.pay(transaction?.snap_token, {
    onSuccess: function (result) {
        console.log('success', result);
        dispatch(updateTransactionDetailData(result));
        navigate(0);
    },
    onPending: function(result){
        console.log('pending', result);
        navigate(0);
    },
    onClose: function () {
    }
    })
  }

  const formattedPrice = (price) => {
    return price?.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <Box className={classes.container}>
        <Typography variant='h1' component='div' className={classes.pageTitle}>
          Invoice
        </Typography>
        <Card className={classes.cardContainer} sx={{ minHeight: '160px', borderRadius: '20px'}}>
          <Card className={classes.cardOrdererContainer} sx={{ minHeight: '160px', borderRadius: '20px'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '3%' }}>
              <Typography variant='p' component='div' sx={{ fontSize: '16px' }}>
                Invoice No.
              </Typography>
              <Typography variant='p' component='div' sx={{ fontSize: '20px', fontWeight: 'bolder' }}>
                {transaction?.id}
              </Typography>
            </Box>
            <Box className={classes.infoBilContainer}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant='p' component='div'>
                  <FormattedMessage id="bill_order" />
                </Typography>
                <Typography variant='p' component='div' sx={{ fontSize: '20px', fontWeight: 'bolder' }}>
                  {transaction?.fullName}
                </Typography>
                <Typography variant='p' component='div'>
                  {transaction?.address}, {transaction?.city}, {transaction?.province} 
                </Typography>
                <Typography variant='p' component='div'>
                  {transaction?.phone}
                </Typography>
                  {transaction?.status === 'PENDING' && <Typography variant='p' component='div' className={classes.statusPending}>{transaction?.status}</Typography>}
                  {transaction?.status === 'SUCCESS' && <Typography variant='p' component='div' className={classes.statusSucess}>{transaction?.status}</Typography>}
                  {transaction?.status === 'PROCESS' && <Typography variant='p' component='div' className={classes.statusProcess}>{transaction?.status}</Typography>}
                  {transaction?.status === 'FAIL' && <Typography variant='p' component='div' className={classes.statusFail}>{transaction?.status}</Typography>}
                {transaction?.review && transaction.review.length > 0 && (
                  <Box>
                    <Typography variant='p' component='div' sx={{ marginTop: '2%', fontWeight: 'bolder' }}>
                      Ulasan:
                    </Typography>
                      <Box sx={{ display: 'flex', gap: '1%' }}>
                        <Typography variant='p' component='div'>
                          {transaction?.review[0].comment}
                        </Typography>
                        <Rating rating={transaction?.review[0]?.rating} />
                      </Box>
                  </Box>
                )}
              </Box>
              <Box className={classes.expiryContainer}>
                <Box className={classes.expiryInfo} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant='p' component='div'>
                    <FormattedMessage id="orderOn_order" />
                  </Typography>
                  <Typography variant='p' component='div' sx={{ fontSize: '17px' }}>
                    {moment(transaction?.orderAt).format('DD MMM HH:mm')}
                  </Typography>
                </Box>
                <Box className={classes.expiryInfo} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant='p' component='div'>
                    <FormattedMessage id="expiryOn_order" />
                  </Typography>
                  <Typography variant='p' component='div' sx={{ fontSize: '17px' }}>
                    {moment(transaction?.expiryAt).format('DD MMM HH:mm')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          <Box>
            <Typography variant='p' component='div' sx={{ fontSize: '25px', fontWeight: 'bolder' }}>
              <FormattedMessage id="order_title" />
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: '1%', backgroundColor: 'transparent', borderRadius: '20px' }}>
              <Table >
                <TableHead>
                  <TableRow >
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}></TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="item_table_order" /></TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="qty_table_order" /></TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="price_table_order" /></TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="subTotal_table_order" /></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transaction?.order?.map((tr, index) => (
                    <TableRow key={index}>
                      <TableCell align='center' sx={{ borderBottom: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}> 
                        <CardMedia 
                          component="img"
                          image={tr?.item?.img}
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', borderBottom: 'none' }}>{tr?.item_name}</TableCell>
                      <TableCell sx={{ textAlign: 'center', borderBottom: 'none' }}>{tr?.qty}</TableCell>
                      <TableCell sx={{ textAlign: 'center', borderBottom: 'none' }}>{formattedPrice(tr?.item?.price)}</TableCell>
                      <TableCell sx={{ textAlign: 'center', borderBottom: 'none' }}>{formattedPrice(tr?.qty * tr?.item?.price)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}><FormattedMessage id="shipping_cost_checkout" /></TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none' }}>{formattedPrice(transaction?.shippingCost)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder', fontSize: '20px' }}>Total</TableCell>
                    <TableCell sx={{ textAlign: 'center', borderBottom: 'none', fontWeight: 'bolder' }}>{formattedPrice(transaction?.total)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {transaction?.status !== 'FAIL' && transaction?.status !== 'PROCESS' && 
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' sx={{ mt: 3, ml: 1 }} className={classes.buyButton} onClick={() => transaction?.status === 'PENDING' ? onPressPay() : handleReviewModalOpen()}>
                  {  transaction?.status === 'PENDING' ? <FormattedMessage id="pay_button" /> : <FormattedMessage id="review_button" />  }
                </Button> 
              </Box>
            }
          </Box>
        </Card> 
        <ReviewOrder isOpen={reviewModalOpen} onClose={handleReviewModalClose} id={transaction?.id} existingReview={transaction?.review?.length > 0 ? true : false}/>
    </Box>
  )
}

OrderDetail.propTypes = {
  transaction: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  transaction: selectTransactionDetail,
});

export default connect(mapStateToProps)(OrderDetail);
