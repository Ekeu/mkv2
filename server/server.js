const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);


app.use(notFound)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
