const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

const user = require('./server/api/user');
const item = require('./server/api/item');
const cart = require('./server/api/cart');

dotenv.config();

const __dirname1 = path.resolve();

app.use(express.static(__dirname1 + '/public'))


app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Connected');
});

app.use('/user', user);
app.use('/item', item);
app.use('/cart', cart);


app.listen(process.env.PORT, () => {
    console.log(`Server is running in ${process.env.PORT}`)
});