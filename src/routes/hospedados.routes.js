const express = require('express');
const hospedadosController = require('../controllers/hospedados.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarHospedaje/:idReservacion', md_autenticacion.Auth, hospedadosController.agregarHospedados)
api.get('/obtenerHospedados', md_autenticacion.Auth, hospedadosController.obtenerhospedajes)
api.get('/obtenerServicios/:idHospedado', md_autenticacion.Auth, hospedadosController.obtenerServicios)
api.post('/agregarServicio/:idHospedado', md_autenticacion.Auth, hospedadosController.agregarServicios)
api.get('/obtnerUsuarioNombre/:nombre', md_autenticacion.Auth, hospedadosController.buscarUsuarioNombre)
module.exports = api;