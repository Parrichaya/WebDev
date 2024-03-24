const express = require('express');

const app = express();

const adminRoutes = require('./routes/chatadmin');
const displayRoutes = require('./routes/chatdisplay');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(displayRoutes);

app.listen(4000, () => {
  console.log('Listening...');
})