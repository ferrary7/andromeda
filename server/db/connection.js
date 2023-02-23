const mongoose = require('mongoose');
require('dotenv').config({ path: '../config.env' });

const DB_URI = process.env.DATABASE_URI;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));



