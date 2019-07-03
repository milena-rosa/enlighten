const express = require('express');
const IrradiationController = require('./controllers/IrradiationController');
const CostController = require('./controllers/CostController');
const ResultController = require('./controllers/ResultController');

const routes = new express.Router();

routes.post('/result', ResultController.create);
routes.get('/result', ResultController.index);

routes.get('/irradiations', IrradiationController.index);
routes.post('/irradiations', IrradiationController.store);

routes.get('/costs', CostController.index);
routes.post('/costs', CostController.store);

module.exports = routes;
