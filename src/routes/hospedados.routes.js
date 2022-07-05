const express = require('express');
const hospedadosController = require('../controllers/hospedados.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarHospedaje/:idReservacion', md_autenticacion.Auth, hospedadosController.agregarHospedados)
api.get('/obtenerHospedados', md_autenticacion.Auth, hospedadosController.obtenerhospedajes)

module.exports = api;