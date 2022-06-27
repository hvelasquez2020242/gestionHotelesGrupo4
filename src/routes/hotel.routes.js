const express = require('express');
const hotelController = require('../controllers/hotel.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/agregarHotel', md_autenticacion.Auth , hotelController.agregarHotel);// Login de Administrador y de Clientes
api.get('/obtenerHoteles', hotelController.obtenerHoteles)
api.get('/obtenerHotelId/:idHotel', hotelController.obtenerHotelesId)
module.exports = api;