const path = require('path');

const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contact');
const successRoutes = require('./routes/success');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);
app.use(successRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname ,'views', '404.html'));
})

app.listen(4000, () => {
  console.log('Listening...');
})