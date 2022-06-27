const express = require('express');
const habitacionController = require('../controllers/habitacion.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();
api.post('/agregarHabitacion', md_autenticacion.Auth, habitacionController.agregarHabitacion);
api.get('/obtenerHabitacionesSimple/:idHotel', habitacionController.obtenerHabitacionesSimple)
api.get('/obtenerHabitacionesMedia/:idHotel', habitacionController.obtenerHabitacionesMedia)
api.get('/obtenerHabitacionesLujosa/:idHotel', habitacionController.obtenerHabitacionesLujosa)

module.exports = api;