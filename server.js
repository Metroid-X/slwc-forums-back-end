// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000; 


// establish mongodb connection
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware use section
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routers

app.get('/', (req,res) => {
    res.send('Everything is operational');
});

app.listen(port, () => {
    console.log(`Express backend is listening on port ${Number(port)}`);
});