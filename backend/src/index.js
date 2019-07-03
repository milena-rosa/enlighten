const express = require('express');
const mongoose = require('mongoose');

const server = express();

mongoose.connect(
  'mongodb://pi:projetointegrador1@ds245647.mlab.com:45647/enlighten',
  { useNewUrlParser: true }
);

server.use(express.json());

server.use(require('./routes'));

server.listen(3333, () => {
  console.log('server running.');
});
