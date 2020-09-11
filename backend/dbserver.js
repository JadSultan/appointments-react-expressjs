const express = require('express'),
  app = express(),
  mysql = require('mysql'), // import mysql module
  cors = require('cors'),
  bodyParser = require('body-parser');

// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
})


// make server object that contain port property and the value for our server.
var server = {
  port: 8080
};

const appointsRouter = require('./appointments');
// use the modules
app.use(cors())
app.use(bodyParser.json());
// use router
app.use('/api', appointsRouter);

// starting the server
app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));