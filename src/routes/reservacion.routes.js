const reservacionController = require('../controllers/reservacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const express = require('express');

const api = express.Router();

api.post('/agregarReservacion/:idHabitacion', md_autenticacion.Auth, reservacionController.agregarReservacion)
api.get('/obtenerReservacion', md_autenticacion.Auth, reservacionController.obtenerReservaciones)
api.get('/obtenerReservacionId', md_autenticacion.Auth, reservacionController.obtenerReservacionId)
module.exports = api;