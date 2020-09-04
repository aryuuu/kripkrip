const express = require('express');
const cors = require('cors');

const apiv1 = require('./routes/apiv1');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', apiv1);

module.exports = app;