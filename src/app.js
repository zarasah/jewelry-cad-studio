const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));