const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const apiv1 = require('./routes/apiv1');

const app = express();

app.use(cors());
// app.use(express.static('public'));
app.use(express.json());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use('/api/v1', apiv1);

module.exports = app;