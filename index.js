require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const { db } = require('./models/db');
const ExpressError = require('./utils/ExpressError');

const { updateLoginStatus } = require('./middleware/authMiddleware');

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
const userRoutes = require('./routes/userRoutes');

app.get('*', updateLoginStatus);

app.get('/', (req, res) => {
  res.send('Homepage');
});

// use routes
app.use(authRoutes);
app.use(userRoutes);

// generic 404 for unused routes
app.use((req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (!err.message) err.message = 'Something went wrong...';

  res.status(statusCode).render('error', { err });
});
