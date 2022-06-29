const express = require('express');
const eventoController = require('../controllers/evento.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarEvento', md_autenticacion.Auth, eventoController.agregarEvento); 
api.get('/obtenerEventos',  md_autenticacion.Auth,eventoController.obtenerEventos);
api.get('/obtenerEventosId/:tipoDeEvento',  eventoController.obtenerEventosId);

module.exports = api;