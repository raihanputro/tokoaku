const express = require('express');
const dotenv = require('dotenv');
const Boom = require('boom');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const app = express();
const Port = process.env.PORT;
const dirname = path.resolve();

const Auth = require('./server/api/auth');
const Item = require('./server/api/item');
const User = require('./server/api/user');
const Category = require('./server/api/category');
const Wishlist = require('./server/api/wishlist');
const Cart =  require('./server/api/cart');
const Transaction = require('./server/api/transaction');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
  if (error) {
    console.log(['API Request', 'Invalid input', 'ERROR'], { info: error });
    res.statusCode = 400;
    const timeDiff = process.hrtime(req.startTime);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    const logData = {
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      timeTaken
    };
    console.log(['API Request', 'Invalid input', 'info'], logData);
    return res.status(400).json(Boom.badRequest().output.payload);
  }

  next();
});

app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = async (data) => {
    res.send = oldSend; 
    const statusCode = (data.output && data.output.statusCode) || res.statusCode;
    let bodyResponse = data;

    if (statusCode !== 200 && data.isBoom) {
      bodyResponse = data.output.payload;
    }

    const response = {
      statusCode,
      bodyResponse
    };

    const timeDiff = process.hrtime(req.startTime);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    const logData = {
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      timeTaken
    };

    console.log(['API Request', 'info'], logData);
    return res.status(response.statusCode).send(response.bodyResponse); 
  };

  next();
});

app.use('/api/auth', Auth);
app.use('/api/item', Item);            
app.use('/api/user', User);            
app.use('/api/category', Category);
app.use('/api/wishlist', Wishlist);
app.use('/api/cart', Cart);
app.use('/api/transaction', Transaction);

app.listen(Port, () => {
  console.log(['Info'], `Server started on port ${Port}`);
});
