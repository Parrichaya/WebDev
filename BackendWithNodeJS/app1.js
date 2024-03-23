const http = require('http');
// const routes = require('./routes.js')
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><br>'+
  '<input type="text" name="size"><br>' +'<button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(4000, () => {
  console.log('Listening...');
})