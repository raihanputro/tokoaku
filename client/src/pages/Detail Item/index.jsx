import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";

import { setCartitem } from './actions';
import { getItemDetail } from './actions';
import { selectItemDetail } from './selectors';
import { selectUser } from '@containers/Client/selectors';

import classes from './style.module.scss';

const DetailItem = ({itemDataSelect, userDataSelect}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [count, setCount] = useState(1);
  const [itemData, setItemData] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getItemDetail(id), () => {})
    } else {
      navigate('/');
    }
  }, [id]);

  useEffect(() => {
    setItemData(itemDataSelect.result)
  }, [itemDataSelect]);

  useEffect(() => {
    const newSubtotal = count * itemData?.price;
    setSubTotal(newSubtotal)
  }, [count, itemData?.price]);

  const increment = () => {
    if(count < itemData?.stock) {
      setCount(count+1);
    } 
  };

  const decrement = () => {
    if( count > 1) {
      setCount(count-1);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(setCartitem({item_id: itemData?.id, user_id: userDataSelect.id, qty: count}, userDataSelect.id));
    setCount(1);
  };

  return (
    <Box className={classes.container}>
      <Card sx={{ marginTop: '2%' }}>
        <Box className={classes.cardContainer}>
          <CardMedia 
            component="img"
            image={itemData?.img}
            sx={{ width: 550 }}
          />
          <Box className={classes.itemInfo}>
            <CardContent>
              <Typography variant='h6' component='div' className={classes.itemTitle}>
                {itemData?.name}
              </Typography>
              <Typography variant='h6' component='div' className={classes.itemPrice}>
                Rp{itemData?.price}
              </Typography>
              <Typography variant='h6' component='div' className={classes.itemDesc}>
                {itemData?.desc}
              </Typography>
            </CardContent>
          </Box>
          <Box className={classes.addItem}>
            <Typography variant='h6' component='div' className={classes.itemTitle}>
                Atur jumlah
            </Typography>
            <Box className={classes.addStock}>
              <Box>
                <Button onClick={() =>  decrement()}>
                  <RemoveIcon />
                </Button>
                {count}
                <Button onClick={() => increment()}>
                  <AddIcon />
                </Button>
              </Box>
              <Typography variant='h6' component='div' className={classes.itemTitle}>
                Stok: {itemData?.stock}
              </Typography>
            </Box>
            <Typography variant='h6' component='div' className={classes.itemTitle}>
                Subtotal: Rp{subTotal}
            </Typography>
            <Button onClick={onSubmit}>
              <AddIcon /> Keranjang
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

DetailItem.propTypes = {
  itemDataSelect: PropTypes.object,
  userDataSelect: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  itemDataSelect: selectItemDetail,
  userDataSelect: selectUser
})

export default connect(mapStateToProps)(DetailItem);