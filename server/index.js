require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./routes/index')

const connectDB = require('./config/database.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});