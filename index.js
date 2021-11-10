require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const { db } = require('./models/db');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// db connection

db.authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Server listening on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log('DB Connection error - ', err);
  });

// routers
const authRoutes = require('./routes/authRoutes');

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use(authRoutes);

// generic 404 for unused routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});