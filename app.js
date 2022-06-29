const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuario.routes');
const HotelRutas = require('./src/routes/hotel.routes');
const HabitacionRutas = require('./src/routes/habitacion.routes');
const EventoRutas = require('./src/routes/evento.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, HotelRutas, HabitacionRutas, EventoRutas);


module.exports = app;