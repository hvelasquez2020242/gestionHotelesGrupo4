const reservacionController = require('../controllers/reservacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const express = require('express');

const api = express.Router();

api.post('/agregarReservacion/:idHabitacion/:idCantidadDias', md_autenticacion.Auth, reservacionController.agregarReservacion)//Esta es la ruta que usamos
api.get('/obtenerReservacion', md_autenticacion.Auth, reservacionController.obtenerReservaciones)
api.post('/hacerFactura/:idHospedaje', md_autenticacion.Auth, reservacionController.hacerFactura)
api.get('/obtenerReservacionId', md_autenticacion.Auth, reservacionController.obtenerReservacionId)
api.get('/obtenerFacturas', md_autenticacion.Auth, reservacionController.obtenerFacturas)
api.delete('/eliminarReservacion/:idReservacion', md_autenticacion.Auth, reservacionController.eliminarReservacion)
api.get('/obtenerFacturasId', md_autenticacion.Auth, reservacionController.obtenerFacturasId)

module.exports = api;